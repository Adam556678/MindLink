using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using mindlinkapi.data;
using mindlinkapi.Entities;
using MindLinkAPI.Entities;
using MindLinkAPI.Models;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MindLinkAPI.Enums;
using System.Security.Cryptography;

namespace MindLinkAPI.Services
{
    public class AuthService(MLinkDbContext context, IConfiguration configuration) : IAuthService
    {

        public async Task<LoginResponse> LoginAsync(UserDto request)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null)
                return new LoginResponse {
                    Result = LoginResult.InvalidCredentials
                };

            // verify password
            var passowrdVerify = new PasswordHasher<User>().VerifyHashedPassword(
                user, user.HashedPassword, request.Password);
            if (passowrdVerify == PasswordVerificationResult.Failed)
                return new LoginResponse {
                    Result = LoginResult.InvalidCredentials
                };

            // check for verification
            if (user.Verified == false)
                return new LoginResponse {
                    Result = LoginResult.NotVerified
                };

            return new LoginResponse {
                    Result = LoginResult.Success,
                    Token = CreateToken(user)
                };
        }

        public async Task<User?> RegisterAsync(UserRegisterDto request)
        {
            // check for a user with the same email
            var existUser =  await context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (existUser != null)
            {
                return null;
            }

            // create a new user 
            User user = new User
            {
                Email = request.Email,
                Name = request.Name,   
            };

            // Hash user's password
            var hashedPassword = new PasswordHasher<User>()
                .HashPassword(user, request.Password);

            user.HashedPassword = hashedPassword;

            // create verification token (for routing purposes)
            user.EmailVerificationToken = GenerateVerificationToken();

            context.Users.Add(user);
            await context.SaveChangesAsync();
            
            // create OTP and send it to the user
            var otp = await CreateOTP(user.Id);
            await SendVerificationEmail(user.Email, otp);

            return user;
        }

        private string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email)
            };

            // Signing key
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(configuration.GetValue<string>("AppSettings:Token")!)
            );

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new JwtSecurityToken(
                issuer: configuration.GetValue<string>("AppSettings:Issuer"), // who created the token (me)
                audience: configuration.GetValue<string>("AppSettings:Audience"), // who should accept it (frontend)
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }

        private async Task<string> CreateOTP(int userId)
        {   

            var random = new Random();
            string otp = random.Next(1000, 9999).ToString();

            var userOtp = new UserOTP
            {
              OTP = otp,
              UserId = userId,
              CreatedAt = DateTime.UtcNow,
              ExpiresAt = DateTime.UtcNow.AddHours(1)
            };

            context.UserOTPs.Add(userOtp);
            await context.SaveChangesAsync();

            return otp;
        }

        private async Task SendVerificationEmail(string toEmail, string otp)
        {
            var sender = configuration["EmailSettings:FromEmail"];
            var appPassword = configuration["EmailSettings:AppPassword"];
            var host = configuration["EmailSettings:SMTPHost"];
            var port = configuration.GetValue<int>("EmailSettings:SMTPPort");

            var email = new MimeMessage();

            email.From.Add(new MailboxAddress("MindLink", sender));
            email.To.Add(new MailboxAddress("", toEmail));
            email.Subject = "Your Verification Code";

            email.Body = new TextPart("html")
            {
                Text = $"<h2>Your verification code is:</h2><h1>{otp}</h1><p>Expires in 1 hour.</p>"
            };

            using var smtp = new SmtpClient();

            await smtp.ConnectAsync(host, port, SecureSocketOptions.StartTls);

            await smtp.AuthenticateAsync(sender, appPassword);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }

        public async Task<OTPResult> CheckOTP(string code, string emailVerificationToken)
        {
            
            var user = await context.Users
                .FirstOrDefaultAsync(u => u.EmailVerificationToken == emailVerificationToken);
            if (user == null)
                return OTPResult.UserNotFound;
            
            var otp = await context.UserOTPs
                .FirstOrDefaultAsync(c => c.UserId == user.Id);

            if (otp == null)
                return OTPResult.OTPNotFound; 
            
            if (otp.OTP != code)
                return OTPResult.InvalidOTP;
            
            if (otp.ExpiresAt < DateTime.UtcNow)
            {
                // Delete the expired OTP
                context.UserOTPs.Remove(otp);
                await context.SaveChangesAsync();

                // create a new OTP and send it
                var newOtp = await CreateOTP(user.Id);
                await SendVerificationEmail(user.Email, newOtp);
                
                return OTPResult.ExpiredOTP;
            }

            // Delete the OTP and mark user as verified
            user.Verified = true;
            context.UserOTPs.Remove(otp);
            await context.SaveChangesAsync();
            
            return OTPResult.Success;
        }

        private static string GenerateVerificationToken()
        {
            return Convert.ToHexString(RandomNumberGenerator.GetBytes(32));
        }
    }
}
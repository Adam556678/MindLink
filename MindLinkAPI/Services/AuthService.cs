using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using mindlinkapi.data;
using mindlinkapi.Entities;
using MindLinkAPI.Models;

namespace MindLinkAPI.Services
{
    public class AuthService(MLinkDbContext context, IConfiguration configuration) : IAuthService
    {
        public async Task<string?> LoginAsync(UserDto request)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null)
            {
                return null;
            }

            // verify password
            var passowrdVerify = new PasswordHasher<User>().VerifyHashedPassword(
                user, user.HashedPassword, request.Password);
            if (passowrdVerify == PasswordVerificationResult.Failed)
            {
                return null;
            }

            return CreateToken(user);
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
            

            context.Users.Add(user);
            await context.SaveChangesAsync();

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
    }
}
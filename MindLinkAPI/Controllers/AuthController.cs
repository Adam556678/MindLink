using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using mindlinkapi.Entities;
using MindLinkAPI.Enums;
using MindLinkAPI.Models;
using MindLinkAPI.Services;

namespace MindLinkAPI.Controllers
{   
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserRegisterDto request)
        {
            var user = await authService.RegisterAsync(request); 
            if (user == null)
            {
                return BadRequest(new
                {
                    message = "Email is already used" 
                });
            }

            return Ok(new {message = $"An OTP verification code was sent to {user.Email}"});
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(UserDto request)
        {
            var token = await authService.LoginAsync(request);
            if (token == null)
            {
                return Unauthorized(new {message = "Invalid Credentials"});    
            }

            // Create cookie options
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddDays(1)
            };

            // Set the cookie
            Response.Cookies.Append("jwt", token, cookieOptions);

            return Ok(new {message = "Logged in successfully"});
        }

        [HttpPost("verify/{code}")]
        public async Task<ActionResult> Verify(string code, string email)
        {
            var result = await authService.CheckOTP(code, email); 

            switch (result)
            {
                case OTPResult.Success:
                    return Ok(new {message = "User verified successfully"});

                case OTPResult.InvalidOTP:
                    return BadRequest(new {message = "Invalid OTP"});

                case OTPResult.ExpiredOTP:
                    return BadRequest(new {message = "OTP is expired, new one was sent"});

                default:
                    return BadRequest(new {message = "User not found"});
            }
        }


        [Authorize]
        [HttpGet("me")]
        public IActionResult Me()
        {
            var userName = User.Identity?.Name;
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var email = User.FindFirst(ClaimTypes.Email)?.Value;

            return Ok(new
            {
                id = userId,
                name = userName,
                email = email
            });
        }
    }
}
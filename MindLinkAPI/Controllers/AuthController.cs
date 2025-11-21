using Microsoft.AspNetCore.Mvc;
using mindlinkapi.Entities;
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

            return Ok(user);
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
    }
}
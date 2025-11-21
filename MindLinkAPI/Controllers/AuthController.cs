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
    }
}
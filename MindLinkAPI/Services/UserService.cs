using System.Security.Claims;
using mindlinkapi.data;
using mindlinkapi.Entities;

namespace MindLinkAPI.Services
{
    public class UserService(MLinkDbContext context) : IUserService
    {
        public async Task<User?> GetCurrentUserData(HttpContext httpContext)
        {
            // get user data
            var userIdClaim = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
            {
                return null;
            }

            int userId = int.Parse(userIdClaim);
            var user = await context.Users.FindAsync(userId);
            
            return user;
        }
    }
}
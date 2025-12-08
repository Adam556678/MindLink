using mindlinkapi.Entities;
using MindLinkAPI.Models;

namespace MindLinkAPI.Services
{
    public interface IUserService
    {
        public Task<User?> GetCurrentUserData(HttpContext httpContext);
    }
}
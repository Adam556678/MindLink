using mindlinkapi.Entities;
using MindLinkAPI.Models;

namespace MindLinkAPI.Services
{
    public interface IAuthService
    {
        public Task<User?> RegisterAsync(UserRegisterDto request);

        public Task<User?> LoginAsync(UserDto request);
    }
}
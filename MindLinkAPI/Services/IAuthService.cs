using mindlinkapi.Entities;
using MindLinkAPI.Enums;
using MindLinkAPI.Models;

namespace MindLinkAPI.Services
{
    public interface IAuthService
    {
        public Task<User?> RegisterAsync(UserRegisterDto request);

        public Task<LoginResponse> LoginAsync(UserDto request);

        public Task<OTPResult> CheckOTP(string code, string emailVerificationToken);
    }
}
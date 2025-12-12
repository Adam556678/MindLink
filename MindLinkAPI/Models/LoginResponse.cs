using MindLinkAPI.Enums;

namespace MindLinkAPI.Models
{
    public class LoginResponse
    {
        public LoginResult Result { get; set; }

        public string? Token { get; set; }
    }
}
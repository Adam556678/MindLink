using mindlinkapi.Entities;
using MindLinkAPI.Models;

namespace MindLinkAPI.Mappers
{
    public static class UserMapper
    {
        public static UserRespDto ToRespDto(this User user)
        {
            return new UserRespDto
            {
                Email = user.Email,
                Name = user.Name,
                EmailVerificationToken = user.EmailVerificationToken
            };
        }
    }
}
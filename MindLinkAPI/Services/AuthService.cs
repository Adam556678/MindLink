using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using mindlinkapi.data;
using mindlinkapi.Entities;
using MindLinkAPI.Models;

namespace MindLinkAPI.Services
{
    public class AuthService(MLinkDbContext context, IConfiguration configuration) : IAuthService
    {
        public Task<User?> LoginAsync(UserDto request)
        {
            throw new NotImplementedException();
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
    }
}
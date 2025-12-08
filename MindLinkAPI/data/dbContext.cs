using Microsoft.EntityFrameworkCore;
using mindlinkapi.Entities;
using MindLinkAPI.Entities;

namespace mindlinkapi.data
{
    public class MLinkDbContext(DbContextOptions<MLinkDbContext> options) : DbContext(options)
    {
        public DbSet<User> Users {get; set; }       

        public DbSet<Question> Questions {get; set; }

        public DbSet<Quiz> Quizzes {get; set; }

        public DbSet<Category> Categories {get; set; }

        public DbSet<Result> Results {get; set; }
    }    
}
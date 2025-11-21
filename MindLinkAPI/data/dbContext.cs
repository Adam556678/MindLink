using Microsoft.EntityFrameworkCore;
using mindlinkapi.Entities;

namespace mindlinkapi.data
{
    public class MLinkDbContext(DbContextOptions<MLinkDbContext> options) : DbContext(options)
    {
        public DbSet<User> Users {get; set; }       
    }    
}
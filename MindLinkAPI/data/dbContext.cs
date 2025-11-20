using Microsoft.EntityFrameworkCore;

namespace mindlinkapi.data
{
    public class MLinkDbContext(DbContextOptions<MLinkDbContext> options) : DbContext(options)
    {
        
    }    
}
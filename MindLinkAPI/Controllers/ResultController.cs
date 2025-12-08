
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using mindlinkapi.data;

namespace MindLinkAPI.Controllers
{   
    [Route("api/[controller]")]
    [ApiController]
    public class ResultController(MLinkDbContext context) : ControllerBase
    {
        
    } 

}
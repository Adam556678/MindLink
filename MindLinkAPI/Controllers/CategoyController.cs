using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using mindlinkapi.data;
using MindLinkAPI.Models;
using MindLinkAPI.Mappers;


namespace MindLinkAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController(MLinkDbContext context) : ControllerBase
    {
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<CategoryResponseDto>> GetCategories()
        {
            try
            {
                var categories = await context.Categories
                .Include(c => c.Quizzes)
                .ToListAsync();

                var categoriesDto = categories.Select(c => c.ToCategoryRespDto());

                return Ok(categoriesDto);
            }
            catch (System.Exception)
            {
                
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new {message = "Internal server error"}
                );
            }
        }
    }    
}
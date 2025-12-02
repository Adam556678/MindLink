using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using mindlinkapi.data;
using MindLinkAPI.Models;
using MindLinkAPI.Mappers;
using mindlinkapi.Entities;


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

        [Authorize]
        [HttpGet("{categId}")]
        public async Task<ActionResult<IEnumerable<QuizResponseDto>>> getCategoryQuizzes(int categId)
        {
            try
            {
                var quizzess = await context.Quizzes
                    .Where(q => q.CategoryId == categId && q.Access == "Public")
                    .Include(q => q.Category)
                    .Include(q => q.Questions)
                    .Include(q => q.User)
                    .ToListAsync();
                
                var quizzesDto = quizzess.Select(q => q.ToQuizRespDto());

                return Ok(quizzesDto);
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
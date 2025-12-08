
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mindlinkapi.data;
using MindLinkAPI.Entities;
using MindLinkAPI.Mappers;
using MindLinkAPI.Models;
using MindLinkAPI.Services;

namespace MindLinkAPI.Controllers
{   
    [Route("api/[controller]")]
    [ApiController]
    public class ResultController(MLinkDbContext context, IUserService userService) : ControllerBase
    {
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<ResultResponseDto>> AddResult(CreateResultDto request)
        {
            // get currnet user's data
            var user = await userService.GetCurrentUserData(HttpContext);
            if (user == null)
            {
                return Unauthorized(new {message = "Unauthorized"});
            }

            // get quiz's info
            var quiz = await context.Quizzes
            .Include(q => q.Category)
            .FirstOrDefaultAsync(q => q.Id == request.QuizId);

            if (quiz == null)
            {
                return NotFound(new {message = "Quiz not found"});
            }

            // create a new Result entity
            var result = new Result
            {
                User = user,
                UserId = user.Id,
                Quiz = quiz,
                QuizId = request.QuizId,
                NumQuestions = request.NumQuestions,
                Score = request.Score,
                TimeTaken = request.TimeTaken
            };

            // Add Result entity to DB
            context.Results.Add(result);
            await context.SaveChangesAsync();

            // map result to DTO and return
            return Ok(result.ToDto());
        }
    } 

}
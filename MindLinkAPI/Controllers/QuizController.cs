
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mindlinkapi.data;
using mindlinkapi.Entities;
using MindLinkAPI.Entities;
using MindLinkAPI.Mappers;
using MindLinkAPI.Models;
using MindLinkAPI.Services;

namespace MindLinkAPI.Controllers
{   
    [Route("api/[controller]")]
    [ApiController]
    public class  QuizController(MLinkDbContext context, IUserService userService) : ControllerBase
    {
        
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Quiz>> CreateQuiz(CreateQuizDto request)
        {
            var category = await context.Categories
                .Where(c => c.Name == request.Category)
                .FirstOrDefaultAsync();

            if (category == null)
            {
                return BadRequest(new {message = "Invalid category"});
            }

            // Map questions from DTOs to Entities
            var questions = request.Questions.Select(q => new Question
            {
                Text = q.Text,
                Option1 = q.Option1,
                Option2 = q.Option2,
                Option3 = q.Option3,
                Option4 = q.Option4,
                Answer = q.Answer
            }).ToList();

            // get user data
            var user = await userService.GetCurrentUserData(HttpContext);
            if (user == null)
            {
                return Unauthorized(new {message = "Unauthorized user"});
            }

            var quiz = new Quiz
            {
                Title = request.Title,
                UserId = user.Id,
                User = user!,
                CategoryId = category.Id,
                Category = category,
                Access = request.Access,
                Questions = questions,
                Code = GenerateQuizCode()
            };
            try
            {
                
                // Add to Db and save
                context.Quizzes.Add(quiz);
                await context.SaveChangesAsync();

                // quiz response DTO
                var quizRespDto = quiz.ToQuizRespDto();
                
                return Ok(quizRespDto);
            }
            catch (System.Exception)
            {
                
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new {message = "Something went wrong"}
                    );
            }
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetMyQuizzes()
        {   
            try
            {
                // get current user data
                var user = await userService.GetCurrentUserData(HttpContext);
                if (user == null)
                {
                    return Unauthorized(new {message = "Unauthorized user"});    
                }

                var quizzess = await context.Quizzes
                    .Where(qz => qz.UserId == user.Id)
                    .Include(q => q.Questions)
                    .Include(q => q.Category)
                    .ToListAsync();

                // Map quizzes to RespQuizDto
                var quizzesDto = quizzess.Select(
                    q => q.ToQuizRespDto()
                ).ToList();

                return Ok(quizzesDto);
            }
            catch (System.Exception)
            {
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new {message = "Something went wrong"}
                    );
            }
        }

        [Authorize]
        [HttpGet("{quizId}")]
        public async Task<ActionResult<QuizResponseDto>> GetQuizById(int quizId)
        {
            try
            {
                var quiz = await context.Quizzes
                    .Include(q => q.Questions)
                    .Include(q => q.Category)
                    .Include(q => q.User)
                    .FirstOrDefaultAsync(q => q.Id == quizId);
                    
                if (quiz == null)
                {
                    return NotFound(new {message = "Quiz not found"});
                }

                return Ok(quiz.ToQuizRespDto());
            }
            catch (System.Exception)
            {
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new {message = "Something went wrong"}
                );
            }
        }

        [Authorize]
        [HttpGet("{quizId}/results")]       
        public async Task<ActionResult<ResultResponseDto>> GetQuizResults(int quizId)
        {
            var results = await context.Results
                .Where(r => r.QuizId == quizId)
                .Include(r => r.User)
                .Include(r => r.Quiz)
                    .ThenInclude(q => q.Category)
                .ToListAsync();
            
            if (results == null)
            {
                return NotFound(new {message = "No results found for this quiz"});
            }

            // map to DTO
            var resultsDto = results.Select(res => res.ToDto());
            return Ok(resultsDto);
        }

        [Authorize]
        [HttpGet("find/{code}")]
        public async Task<ActionResult<int>> GetQuizIdByCode(string code)
        {
            var quizId = await context.Quizzes
                .Where(q => q.Code == code)
                .Select(q => q.Id)
                .FirstOrDefaultAsync();

            if (quizId == 0)
                return NotFound(new {message = "Quiz not found"});
            
            return Ok(quizId);
        }

        private string GenerateQuizCode()
        {
            // Generates a random 6-character alphanumeric code
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$&";
            var random = new Random();
            var code = "";

            for (int i = 0; i < 6 ; i++)
            {
                code += chars[random.Next(chars.Length)];
            }

            return code;

        }

        
    }
}
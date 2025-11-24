
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mindlinkapi.data;
using mindlinkapi.Entities;
using MindLinkAPI.Entities;
using MindLinkAPI.Models;

namespace MindLinkAPI.Controllers
{   
    [Route("api/[controller]")]
    [ApiController]
    public class  QuizController(MLinkDbContext context) : ControllerBase
    {
        
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

            var quiz = new Quiz
            {
                Title = request.Title,
                CategoryId = category.Id,
                Category = category,
                Questions = questions,
                Code = GenerateQuizCode()
            };
            try
            {
                
                // Add to Db and save
                context.Quizzes.Add(quiz);
                await context.SaveChangesAsync();
    
                return Ok(quiz);
            }
            catch (System.Exception)
            {
                
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new {message = "Something went wrong"}
                    );
            }
        }

        private string GenerateQuizCode()
        {
            // Generates a random 6-character alphanumeric code
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
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
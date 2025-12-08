using MindLinkAPI.Entities;
using MindLinkAPI.Models;

namespace MindLinkAPI.Mappers
{
    public static class ResultMapper
    {
        public static ResultResponseDto ToDto(this Result result)
        {
            return new ResultResponseDto
            {
                Id = result.Id,
                NumQuestions = result.NumQuestions,
                Quiz = new QuizInfoDto
                {
                    Id = result.QuizId,
                    Title = result.Quiz.Title,
                    Category = result.Quiz.Category.Name
                },
                User = new UserRespDto
                {
                    Name = result.User.Name,
                    Email = result.User.Email
                },
                Score = result.Score,
                TimeTaken = result.TimeTaken
            };
        }
    } 
}
using mindlinkapi.Entities;
using MindLinkAPI.Models;

namespace MindLinkAPI.Mappers
{
    public static class QuizMapper
    {
        public static QuizResponseDto ToQuizRespDto(this Quiz quiz)
        {
            return new QuizResponseDto
            {
                Id = quiz.Id,
                Title = quiz.Title,
                Category = quiz.Category.Name,
                UserId = quiz.UserId,
                UserName = quiz.User.Name,
                Code = quiz.Code,
                Questions = quiz.Questions
                                .Select(q => new QuestionDto
                                {
                                    Text = q.Text,
                                    Option1 = q.Option1,
                                    Option2 = q.Option2,
                                    Option3 = q.Option3,
                                    Option4 = q.Option4,
                                    Answer = q.Answer
                                }).ToList()
            };
        }
    }
}
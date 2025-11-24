using Microsoft.AspNetCore.SignalR;

namespace MindLinkAPI.Entities
{
    public class Question
    {
        public int Id { get; set; }

        public int QuizId { get; set; }

        public string Text { get; set; } = string.Empty;

        public string Option1 { get; set; } = string.Empty;

        public string Option2 { get; set; } = string.Empty;

        public string Option3 { get; set; } = string.Empty;

        public string Option4 { get; set; } = string.Empty;

        public int Answer { get; set; }
    }
}
namespace MindLinkAPI.Models
{
    public class CreateQuizDto
    {
        public string Title { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;

        public string Access {get; set; } = "Public";

        public List<QuestionDto> Questions { get; set; } = new();
    }

    public class QuizResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public int UserId { get; set; }
        public string Code {get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public List<QuestionDto> Questions { get; set; } = new();
    }

    public class QuizInfoDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        
    }
}
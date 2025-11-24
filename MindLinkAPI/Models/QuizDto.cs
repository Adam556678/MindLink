namespace MindLinkAPI.Models
{
    public class CreateQuizDto
    {
        public string Title { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;

        public List<CreateQuestionDTO> Questions { get; set; } = new();
    }
}
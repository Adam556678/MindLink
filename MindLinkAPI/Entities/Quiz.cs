using MindLinkAPI.Entities;

namespace mindlinkapi.Entities
{
    public class Quiz
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public required User User { get; set; }

        public string Title { get; set; } = string.Empty;

        public int CategoryId { get; set; }
        public required Category Category { get; set; }

        public string Code { get; set; } = string.Empty;

        public string Access {get; set; } = "Public";

        public List<Question> Questions { get; set; } = new();

    }
}
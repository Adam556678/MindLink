using mindlinkapi.Entities;

namespace MindLinkAPI.Entities
{
    public class Category
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public List<Quiz> Quizzes {get; set;} = new();
    }
}
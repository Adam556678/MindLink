using System.Text.Json.Serialization;

namespace mindlinkapi.Entities
{
    public class User
    {
        public int Id { get; set; }
        
        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string HashedPassword {get; set; } = string.Empty;

        [JsonIgnore] // prevents infinite loop
        public List<Quiz> Quizzes { get; set; } = new();

    }
}
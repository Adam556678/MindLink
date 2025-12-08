using mindlinkapi.Entities;

namespace MindLinkAPI.Entities
{
    public class Result
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public required User User { get; set; }

        public int QuizId { get; set; }
        public required Quiz Quiz { get; set; }

        public int Score { get; set; }

        public int NumQuestions { get; set; }

        public int TimeTaken { get; set; }
    }
}
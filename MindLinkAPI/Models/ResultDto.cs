namespace MindLinkAPI.Models
{
    public class ResultResponseDto
    {
        public int Id { get; set; }

        public int MyProperty { get; set; }

        public required UserRespDto User { get; set; }

        public required QuizInfoDto Quiz {get; set; }

        public int Score { get; set; }

        public int NumQuestions { get; set; }

        public int TimeTaken { get; set; }

    }

    public class CreateResultDto
    {
        public int QuizId { get; set; }
        public int Score { get; set; }
        public int NumQuestions { get; set; }
        public int TimeTaken { get; set; }
    }
}
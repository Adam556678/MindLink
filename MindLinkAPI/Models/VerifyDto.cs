namespace MindLinkAPI.Models
{
    public class VerifyDto
    {
        public required string Code { get; set; }
        public required string VerifyToken { get; set; }
    }
}
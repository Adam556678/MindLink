namespace MindLinkAPI.Entities
{
    public class UserOTP
    {
        public int Id { get; set; }
        
        public int UserId { get; set; }

        public string OTP { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }
        public DateTime ExpiresAt { get; set; }
    }
}
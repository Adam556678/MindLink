namespace MindLinkAPI.Models
{
    public class CreateQuestionDTO
{
    public string Text { get; set; } = string.Empty;
    public string Option1 { get; set; } = string.Empty;
    public string Option2 { get; set; } = string.Empty;
    public string Option3 { get; set; } = string.Empty;
    public string Option4 { get; set; } = string.Empty;

    public int Answer { get; set; }
}
}
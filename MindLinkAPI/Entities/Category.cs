namespace MindLinkAPI.Entities
{
    public class Category
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public int MyProperty { get; set; }

        public List<int> Quizes {get; set;} = [];
    }
}
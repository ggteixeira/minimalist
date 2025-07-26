namespace Minimalist.Data.Dtos;

public class ReadTodoDto
{
    public string Id { get; set; }
    public string Title { get; set; }
    public DateTime ReadTime { get; set; } = DateTime.Now;
}
namespace Minimalist.Data.Dtos;

public class ReadTodoDto
{
    public string Title { get; set; }
    public DateTime ReadTime { get; set; } = DateTime.Now;
}
using System.ComponentModel.DataAnnotations;

namespace Minimalist.Data.Dtos;

public class ReadTodoDto
{
    [Required] public string Id { get; set; }
    public string Title { get; set; }
    // public DateTime ReadTime { get; set; } = DateTime.Now;
    public bool IsCompleted { get; set; }
}
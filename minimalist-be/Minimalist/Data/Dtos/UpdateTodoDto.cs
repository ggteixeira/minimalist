using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices.JavaScript;

namespace Minimalist.Data.Dtos;

public class UpdateTodoDto
{
    [Required(ErrorMessage = "Todo title is required")]
    public string Title { get; set; }
    public bool IsCompleted { get; set; }
}
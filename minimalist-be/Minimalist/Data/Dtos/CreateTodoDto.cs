using System.ComponentModel.DataAnnotations;

namespace Minimalist.Data.Dtos;

public class CreateTodoDto
{
    [Required(ErrorMessage = "Todo title is required")]
    public string Title { get; set; }
}
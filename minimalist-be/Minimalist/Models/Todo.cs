using System.ComponentModel.DataAnnotations;

namespace Minimalist.Models;

public class Todo
{
    [Key] [Required] public int Id { get; set; }

    [Required(ErrorMessage = "Todo title is required")]
    public string Title { get; set; }
}
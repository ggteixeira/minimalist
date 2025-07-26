using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Minimalist.Data.Dtos;

public class CreateTodoDto
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string Id;

    [Required(ErrorMessage = "Todo title is required")]
    public string Title { get; set; }
}
using Microsoft.EntityFrameworkCore;
using Minimalist.Models;

namespace Minimalist.Data;

public class TodoContext : DbContext
{
    public TodoContext(DbContextOptions<TodoContext> opts) : base(opts)
    {
        
    }
    
    public DbSet<Todo> Todos { get; set; }
    
}
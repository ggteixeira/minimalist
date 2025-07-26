using Microsoft.AspNetCore.Mvc;
using Minimalist.Models;

namespace Minimalist.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginModel model)
    {
        // fake user validation
        if (model.Username == "admin" && model.Password == "password")
        {
            var token = TokenService.GenerateToken(model.Username);
            return Ok(new { token });
        }

        return Unauthorized();
    }
}
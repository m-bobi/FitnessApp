using backend.DbContext;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

public class UserController : Controller
{
    private readonly ApplicationDbContext _dbContext;

    // database injection
    public UserController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    //  api creating to get users starts here
    [HttpGet("getAllUsers")]
    public async Task<List<User>> GetAllUsers()
    {
        
       return await _dbContext.Users.ToListAsync();
       
    }
    //  api creating to get users ends here
    
    // api creating to add users starts here
    [HttpPost("addUser")]
    public async Task<IActionResult> AddUser(User user)
    {
        if(user is null)
        {
            return BadRequest();
        }
        else
        {
            await _dbContext.AddAsync(user);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
    }
    // api creating to add users ends here
}
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.DbContext;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

public class UserController : Controller
{
    private readonly ApplicationDbContext _dbContext;

    // Database Injection
    public UserController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    //  Create API to get all users.
    [HttpGet("getAllUsers")]
    public async Task<List<User>> GetAllUsers()
    {
        
       return await _dbContext.Users.ToListAsync();
       
    }

    
    // Create API to add user.
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
}
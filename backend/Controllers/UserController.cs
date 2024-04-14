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
    public async Task<IActionResult> AddUser([FromBody] User user)
    {
        if (user is null)
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

    // Create API to get a specific user by ID.
    [HttpGet("getUser/{id}")]
    public async Task<IActionResult> GetUserById(int id)
    {
        var user = await _dbContext.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    // Create API to delete a user by ID.
    [HttpDelete("deleteUser/{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _dbContext.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        _dbContext.Users.Remove(user);
        await _dbContext.SaveChangesAsync();
        return Ok("User deleted successfully");
    }

    // Create API to update an existing user.
    [HttpPut("updateUser/{id}")]
    public async Task<IActionResult> UpdateUser([FromBody]User user)
    {
        if (user is null || user.UserId == 0)
        {
            return BadRequest("Invalid user data");
        }

        var existingUser = await _dbContext.Users.FindAsync(user.UserId);
        if (existingUser == null)
        {
            return NotFound();
        }

        if (user.UserId != existingUser.UserId)
        {
            return BadRequest("User ID mismatch");
        }

        _dbContext.Entry(existingUser).CurrentValues.SetValues(user);
        await _dbContext.SaveChangesAsync();
        return Ok("User updated successfully");
    }
}
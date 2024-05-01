using backend.DbContext;
using backend.DTO;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

public class UserController : Controller
{
    private readonly UserManager<User> _userManager;
    private readonly TokenService _tokenService;
    private readonly ApplicationDbContext _dbContext;

    public UserController(UserManager<User> userManager, TokenService tokenService, ApplicationDbContext dbContext)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _dbContext = dbContext;
    }

    [HttpPost]
    [Route("api/login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState.Values.SelectMany(v => v.Errors));
        }

        var user = await _userManager.FindByNameAsync(model.Username);

        if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
        {
            return BadRequest("Invalid username or password");
        }

        // Validate the token (replace with your token validation logic)
        var isValidToken = _tokenService.ValidateToken(model.Token); // Implement token validation logic

        if (isValidToken)
        {
            // Login successful, return additional user data or other response
            return Ok(user); // Or return other relevant data about the logged-in user
        }

        return BadRequest("Invalid token");
    }

    [HttpPost]
    [Route("api/register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState.Values.SelectMany(v => v.Errors));
        }

        var user = new User { UserName = model.Username, Email = model.Email, Name = model.Name };
        var result = await _userManager.CreateAsync(user, model.Password);

        if (result.Succeeded)
        {
            // User created successfully
            var token = await _tokenService.GenerateToken(user); // This generates a JWT token
            return Ok(new { token = token }); // Return the token in the response
        }

        return BadRequest(result.Errors.Select(e => e.Description));
    }

    [HttpGet("getAllUsers")]
    [Authorize] // Add authorization for this endpoint
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

        await _dbContext.AddAsync(user);
        await _dbContext.SaveChangesAsync();
        return Ok();
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
        if (user is null)
        {
            return BadRequest("Invalid user data");
        }

        var existingUser = await _dbContext.Users.FindAsync(user.Id);
        if (existingUser == null)
        {
            return NotFound();
        }

        if (user.Id != existingUser.Id)
        {
            return BadRequest("User ID mismatch");
        }

        _dbContext.Entry(existingUser).CurrentValues.SetValues(user);
        await _dbContext.SaveChangesAsync();
        return Ok("User updated successfully");
    }
}
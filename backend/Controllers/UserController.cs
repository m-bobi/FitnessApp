using Asp.Versioning;
using backend.DbContext;
using backend.DTO;
using backend.Enums;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;
[ApiVersion( 1.0 )]
[Route("api/[controller]" )]
public class UserController : Controller
{
    private readonly UserManager<User> _userManager;
    private readonly TokenService _tokenService;
    private readonly ApplicationDbContext _dbContext;

   private readonly UserService _userService;

    public UserController(UserManager<User> userManager, TokenService tokenService, ApplicationDbContext dbContext)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _dbContext = dbContext;
    }

    [HttpPost("register")]
    public async Task <ActionResult<UserDto>> Register([FromBody] RegisterModel registerDto)
    {
        if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
        {
            ModelState.AddModelError("email", "Email already exists!");
            return ValidationProblem();
        }

        if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
        {
            ModelState.AddModelError("username", "Username already exists!");
            return ValidationProblem();
        }

        var user = new User
        {
            Name = registerDto.Name,
            Email = registerDto.Email,
            Role = registerDto.Role,
            Image = registerDto.Image,
            Birthdate = registerDto.Birthdate,
            Address = registerDto.Address,
            PhoneNumber = registerDto.Mobile ,
            Gender = registerDto.Gender,
            UserName = registerDto.Username,
        };
        
        user.RefreshToken = Guid.NewGuid().ToString();
        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (result.Succeeded)
        {
            return CreateUserObject(user);
        }

        return BadRequest("We encountered an error while creating a user. Please, try again later!");


    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Authenticate([FromBody] AuthRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var managedUser = await _userManager.FindByEmailAsync(request.Email!);
        if (managedUser == null)
        {
            return BadRequest("Bad credentials");
        }

        var isPasswordValid = await _userManager.CheckPasswordAsync(managedUser, request.Password!);
        if (!isPasswordValid)
        {
            return BadRequest("Bad credentials");
        }

        var userInDb = _dbContext.Users.FirstOrDefault(u => u.Email == request.Email);

        if (userInDb is null)
        {
            return Unauthorized();
        }

        var tokens = _tokenService.CreateTokens(userInDb);
    
        await _dbContext.SaveChangesAsync();

        return Ok(new AuthResponse
        {
            Username = userInDb.UserName,
            Email = userInDb.Email,
            Token = tokens.AccessToken,
            RefreshToken = tokens.RefreshToken
        });
    }
    
    [HttpPost("refresh-token")]
    public IActionResult RefreshToken([FromBody] string refreshToken)
    {
        try
        {
            var newAccessToken = _tokenService.RefreshAccessToken(refreshToken);
            return Ok(new { AccessToken = newAccessToken });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    
    [HttpGet("getAllUsers")]
    // [Authorize(Roles = "Manager, Trainer")]
    public async Task<List<User>> GetAllUsers()
    {
        return await _dbContext.Users.ToListAsync();
    }

    // Create API to add user.
    [HttpPost("addUser")]
    [Authorize(Roles = "Manager")]
    public async Task<IActionResult> AddUser([FromBody] UserDto userDto)
    {
        if (userDto is null)
        {
            return BadRequest();
        }

        var user = new User
        {
            UserName = userDto.Username,
            Email = userDto.Email,
            Name = userDto.Username,
            PhoneNumber = userDto.PhoneNumber,
            Address = userDto.Address,
            Gender = userDto.Gender,
            Birthdate = userDto.Birthdate,
            Role = userDto.Role
        };

        var result = await _userManager.CreateAsync(user);

        if (result.Succeeded)
        {
            return Ok();
        }

        return BadRequest(result.Errors);
    }
    
    [HttpGet("getUser/{id}")]
    public async Task<IActionResult> GetUserById(String id)
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
    [Authorize(Roles = "Manager")]
    public async Task<IActionResult> DeleteUser(string id)
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

    [HttpPut("updateUser/{id}")]
    public async Task<IActionResult> UpdateUser(string id, [FromBody]UserDto userDto)
    {
        if (userDto is null)
        {
            return BadRequest("Invalid user data");
        }

        var existingUser = await _dbContext.Users.FindAsync(id);
        if (existingUser == null)
        {
            return NotFound();
        }

        existingUser.Address = userDto.Address;
        existingUser.PhoneNumber = userDto.PhoneNumber;
        existingUser.Birthdate = userDto.Birthdate;
        existingUser.Gender = userDto.Gender;
        existingUser.UserName = userDto.Username;
        existingUser.Name = userDto.Name;
        existingUser.Role = userDto.Role;

        await _dbContext.SaveChangesAsync();
        return Ok("User updated successfully!");
    }

     [HttpGet("getUserByUsername/{username}")]
     [Authorize(Roles = "Manager")]
        public async Task<ActionResult<User>> GetUserByUsername(string username)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.UserName == username);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

    [HttpGet("checkEmail")]
    public async Task<IActionResult> CheckEmail(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);

        bool usedEmail = user != null;

        return Ok(usedEmail);
    }
    
    [HttpGet("checkUsername")]
    public async Task<IActionResult> CheckUsername(string username)
    {
        var user = await _userManager.FindByNameAsync(username);

        bool usedUsername = user != null;

        return Ok(usedUsername);
    }

    // Create user object
    private UserDto CreateUserObject (User user)
    {
        var tokens = _tokenService.CreateTokens(user);
        return new UserDto
        {
            Id = user.Id,
            Username = user.UserName,
            Email = user.Email,
            Token = tokens.AccessToken,
            RefreshToken = tokens.RefreshToken,
            Role = Enums.Roles.User
        };
    }
}

using backend.DbContext;
using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[Route("api/[controller]" )]

public class ClassController : Controller
{
    private readonly ApplicationDbContext _dbContext;

    public ClassController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }


    [HttpGet("getAllClasses")]
    public async Task<List<Class>> GetAllClasses()
    {
        return await _dbContext.Class.ToListAsync();
    }


    [HttpPost("addClass")]
    public async Task<IActionResult> AddClass([FromBody] ClassRequest newClassRequest)
    {
        if (newClassRequest is null)
        {
            return BadRequest();
        }

        var newClass = new Class
        {
            ClassId = newClassRequest.ClassId,
            ClassType = newClassRequest.ClassType,
            ClassDescription = newClassRequest.ClassDescription,
            ClassImage = newClassRequest.ClassImage,
            ClassDateTime = newClassRequest.ClassDateTime
        };

        await _dbContext.AddAsync(newClass);
        await _dbContext.SaveChangesAsync();
        return Ok();
    }
    
    [HttpPost("enrollUserInClass/{userId}/{classId}")]
    public async Task<IActionResult> EnrollUserInClass(string userId, int classId)
    {
        var user = await _dbContext.Users.FindAsync(userId);
        var classEntity = await _dbContext.Class.FindAsync(classId);

        if (user == null || classEntity == null)
        {
            return BadRequest("User or class does not exist");
        }

        var userClass = new UserClass
        {
            UserId = userId,
            ClassId = classId
        };

        await _dbContext.UserClasses.AddAsync(userClass);
        await _dbContext.SaveChangesAsync();

        return Ok();
    }
    
    [HttpGet("getEnrolledUsers/{classId}")]
    public async Task<IActionResult> GetEnrolledUsers(int classId)
    {
        try
        {
            var classEntity = await _dbContext.Class.FindAsync(classId);

            if (classEntity == null)
            {
                return NotFound("Class does not exist!");
            }

            var userClasses = await _dbContext.UserClasses
                .Where(uc => uc.ClassId == classId)
                .Include(uc => uc.User)
                .ToListAsync();

            var users = userClasses.Select(uc => new UserDto
            {
                Id = uc.User.Id,
                Email = uc.User.Email,
                Username = uc.User.UserName,
                Role = uc.User.Role
            }).ToList();

            return Ok(users);
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal Server error: {e.Message}");
        }
    }

    [HttpGet("getClass/{id}")]
    public async Task<IActionResult> GetClassById(int id)
    {
        var newClass = await _dbContext.Class.FindAsync(id);
        if (newClass == null)
        {
            return NotFound();
        }
        return Ok(newClass);
    }


    [HttpDelete("deleteClass/{id}")]
    public async Task<IActionResult> DeleteClass(int id)
    {
        var newClass = await _dbContext.Class.FindAsync(id);
        if (newClass == null)
        {
            return NotFound();
        }

        _dbContext.Class.Remove(newClass);
        await _dbContext.SaveChangesAsync();
        return Ok("Class deleted successfully");
    }

    [HttpPut("updateClass/{id}")]
    public async Task<IActionResult> UpdateClass(int id, [FromBody] Class uclass)
    {
        if (uclass is null)
        {
            return BadRequest("Invalid Class data");
        }

        var existingClass = await _dbContext.Class.FirstOrDefaultAsync(p => p.ClassId == id);
        if (existingClass == null)
        {
            return NotFound();
        }

        existingClass.ClassType = uclass.ClassType;
        existingClass.ClassDescription= uclass.ClassType;


        await _dbContext.SaveChangesAsync();
        return Ok("Class updated successfully!");
    }



}





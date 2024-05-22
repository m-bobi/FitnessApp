
using backend.DbContext;
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
    public async Task<IActionResult> AddClass( [FromBody]Class newClass)
    {
        if (newClass is null)
        {
            return BadRequest();
        }

        await _dbContext.AddAsync(newClass);
        await _dbContext.SaveChangesAsync();
        return Ok();
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
    public async Task<IActionResult> UpdateClass([FromBody] Class uClass)
    {
        if (uClass is null || uClass.ClassId == 0)
        {
            return BadRequest("Invalid trainer data");
        }

        var existingClass = await _dbContext.Class.FindAsync(uClass.ClassId);
        if (existingClass == null)
        {
            return NotFound();
        }

        _dbContext.Entry(existingClass).CurrentValues.SetValues(uClass);
        await _dbContext.SaveChangesAsync();
        return Ok("Trainer updated successfully");
    }



}





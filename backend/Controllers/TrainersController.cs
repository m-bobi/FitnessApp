using Asp.Versioning;
using backend.DbContext;
using backend.DTO;
using backend.Enums;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;
[ApiVersion( 1.0 )]
[Route("api/[controller]" )]

public class TrainersController : Controller
{
    private readonly ApplicationDbContext _dbContext;
    private readonly TrainerService _trainerService;

    // Database Injection
    public TrainersController(ApplicationDbContext dbContext, TrainerService trainerService)
    {
        _trainerService = trainerService;
        _dbContext = dbContext;
    }

    [HttpGet("getAllTrainers")]
    [Authorize(Roles = "User, Manager, Trainer")]

    public async Task<List<Trainers>> GetAllTrainers()
    {
        return await _dbContext.Trainers.ToListAsync();
    }


    [HttpPost("addTrainer")]
    [Authorize(Roles = "Manager, Trainer")]

    public async Task<IActionResult> AddTrainer( [FromBody]Trainers trainer)
    {
        if (trainer is null)
        {
            return BadRequest();
        }

        await _dbContext.AddAsync(trainer);
        await _dbContext.SaveChangesAsync();
        return Ok();
    }
    
    [HttpGet("getTrainer/{id}")]
    [Authorize(Roles = "User, Manager, Trainer")]

    public async Task<IActionResult> GetTrainerById(int id)
    {
        var trainer = await _dbContext.Trainers.FindAsync(id);
        if (trainer == null)
        {
            return NotFound();
        }
        return Ok(trainer);
    }

    // Create API to delete an order by ID.
    [HttpDelete("deleteTrainer/{id}")]
    [Authorize(Roles = "User, Manager, Trainer")]

    public async Task<IActionResult> DeleteTrainer(int id)
    {
        var trainer = await _dbContext.Trainers.FindAsync(id);
        if (trainer == null)
        {
            return NotFound();
        }

        _dbContext.Trainers.Remove(trainer);
        await _dbContext.SaveChangesAsync();
        return Ok("Trainer deleted successfully");
    }

    // Create API to update an existing order.
    [HttpPut("updateTrainer/{id}")]
    [Authorize(Roles = "User, Manager, Trainer")]

    public async Task<IActionResult> UpdateTrainer([FromBody] Trainers trainer)
    {
        if (trainer is null || trainer.TrainerId == 0)
        {
            return BadRequest("Invalid trainer data");
        }

        var existingtrainer = await _dbContext.Trainers.FindAsync(trainer.TrainerId);
        if (existingtrainer == null)
        {
            return NotFound();
        }

        _dbContext.Entry(existingtrainer).CurrentValues.SetValues(trainer);
        await _dbContext.SaveChangesAsync();
        return Ok("Trainer updated successfully");
    }

    // FOR FUTURE USES.
    [HttpPut("assignTrainerToClass")]
    public async Task<IActionResult> AssignTrainerToClass(string trainerId, int classId)
    {
        var trainer = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == trainerId && u.Role == Roles.Trainer);
        if (trainer == null)
        {
            return NotFound("Trainer not found or not assigned as trainer.");
        }

        var existingClass = await _dbContext.Class.FirstOrDefaultAsync(c => c.ClassId == classId);
        if (existingClass == null)
        {
            return NotFound("Class not found.");
        }

        existingClass.TrainerId = trainerId;
        await _dbContext.SaveChangesAsync();
        return Ok("Trainer assigned to class successfully!");
    }
}





using backend.DbContext;
using backend.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

public class TrainersController : Controller
{
    private readonly ApplicationDbContext _dbContext;

    // Database Injection
    public TrainersController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Create API to get all orders.
    [EnableCors("_myAllowSpecificOrigins")]
    [HttpGet("getAllTrainers")]
    public async Task<List<Trainers>> GetAllOrders()
    {
        return await _dbContext.Trainers.ToListAsync();
    }
    

    // Create API to add an order.
    [EnableCors("_myAllowSpecificOrigins")]
    [HttpPost("addTrainer")]
    public async Task<IActionResult> AddTrainer(Trainers trainer)
    {
        if (trainer is null)
        {
            return BadRequest();
        }
        else
        {
            await _dbContext.AddAsync(trainer);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
    }
    
    
    // Create API to get a specific order by ID.
    [HttpGet("getTrainer/{id}")]
    [EnableCors("_myAllowSpecificOrigins")]
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
    [EnableCors("_myAllowSpecificOrigins")]
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
    [HttpPut("updateTrainer")]
    [EnableCors("_myAllowSpecificOrigins")]
    public async Task<IActionResult> UpdateTrainer(Trainers trainer)
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
    
    // [HttpPut("updateTrainer")]
    // public async Task<IActionResult> UpdateTrainer(Trainers trainer)
    // {
    //     if (trainer is null || trainer.TrainerId == 0)
    //     {
    //         return BadRequest("Invalid trainer data");
    //     }
    //
    //     var existingtrainer = await _dbContext.Trainers.FindAsync(trainer.TrainerId);
    //     if (existingtrainer == null)
    //     {
    //         return NotFound("Trainer not found");
    //     }
    //
    //     // Update existingtrainer properties with the values from the input trainer
    //     existingtrainer.TrainerName = trainer.TrainerName;
    //     existingtrainer.TrainerEmail = trainer.TrainerEmail;
    //     existingtrainer.TrainerId = trainer.TrainerId;
    //     existingtrainer.TrainerAddress = trainer.TrainerAddress;
    //     // Update other properties as needed
    //
    //     // You can also use AutoMapper for mapping properties if you prefer
    //
    //     try
    //     {
    //         await _dbContext.SaveChangesAsync();
    //         return Ok("Trainer updated successfully");
    //     }
    //     catch (DbUpdateConcurrencyException)
    //     {
    //         // Handle concurrency conflicts if needed
    //         // For example, reloading the entity and then trying to update it again
    //         return Conflict("Concurrency conflict occurred. Please try again.");
    //     }
    //     catch (DbUpdateException)
    //     {
    //         // Handle other database update errors
    //         return StatusCode(StatusCodes.Status500InternalServerError, "Error updating the trainer.");
    //     }
    // }

}



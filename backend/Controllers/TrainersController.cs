using backend.DbContext;
using backend.Models;
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
    // [EnableCors("_myAllowSpecificOrigins")]
    [HttpGet("getAllTrainers")]
    public async Task<List<Trainers>> GetAllTrainers()
    {
        return await _dbContext.Trainers.ToListAsync();
    }


    [HttpPost("addTrainer")]
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






    // Create API to get a specific order by ID.
    [HttpGet("getTrainer/{id}")]
    // [EnableCors("_myAllowSpecificOrigins")]
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
    // [EnableCors("_myAllowSpecificOrigins")]
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



}





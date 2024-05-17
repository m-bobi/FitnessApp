using Asp.Versioning;
using backend.DbContext;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;
[ApiVersion( 1.0 )]
[Route("api/[controller]" )]

public class WorkoutsController : Controller
{
    private readonly ApplicationDbContext _dbContext;

    // Database Injection
    public WorkoutsController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Create API to get all orders.
    // [EnableCors("_myAllowSpecificOrigins")]
    [HttpGet("getAllWorkouts")]
    public async Task<List<Workouts>> GetAllWorkouts()
    {
        return await _dbContext.Workouts.ToListAsync();
    }


    [HttpPost("addWorkout")]
    public async Task<IActionResult> AddWorkout( [FromBody]Workouts workout)
    {
        if (workout is null)
        {
            return BadRequest();
        }

        await _dbContext.AddAsync(workout);
        await _dbContext.SaveChangesAsync();
        return Ok();
    }






    [HttpGet("getWorkout/{id}")]
    // [EnableCors("_myAllowSpecificOrigins")]
    public async Task<IActionResult> GetWorkoutById(int id)
    {
        var workout = await _dbContext.Workouts.FindAsync(id);
        if (workout == null)
        {
            return NotFound();
        }
        return Ok(workout);
    }

    // Create API to delete an order by ID.
    [HttpDelete("deleteWorkout/{id}")]
    public async Task<IActionResult> DeleteWorkout(int id)
    {
        var workout = await _dbContext.Workouts.FindAsync(id);
        if (workout == null)
        {
            return NotFound();
        }

        _dbContext.Workouts.Remove(workout);
        await _dbContext.SaveChangesAsync();
        return Ok("Workout deleted successfully");
    }

    // Create API to update an existing order.
    [HttpPut("updateWorkout/{id}")]
    // [EnableCors("_myAllowSpecificOrigins")]
    public async Task<IActionResult> UpdateWorkout([FromBody] Workouts workout)
    {
        if (workout is null || workout.WorkoutId == 0)
        {
            return BadRequest("Invalid workout data");
        }

        var existingWorkout = await _dbContext.Trainers.FindAsync(workout.WorkoutId);
        if (existingWorkout == null)
        {
            return NotFound();
        }

        _dbContext.Entry(existingWorkout).CurrentValues.SetValues(workout);
        await _dbContext.SaveChangesAsync();
        return Ok("Workout updated successfully");
    }



}





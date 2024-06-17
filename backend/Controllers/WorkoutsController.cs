using Asp.Versioning;
using backend.DbContext;
using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
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

    
    [HttpGet("getAllWorkouts")]
    [Authorize(Roles = "User, Manager, Trainer")]

    public async Task<List<Workouts>> GetAllWorkouts()
    {
        return await _dbContext.Workouts.ToListAsync();
    }


    [HttpPost("addWorkout")]
    [Authorize(Roles = "Manager")]

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
    [Authorize(Roles = "Manager")]

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
    [Authorize(Roles = "Manager")]
    public async Task<IActionResult> UpdateWorkout(int id, [FromBody] Workouts workout)
    {
        if (workout is null)
        {
            return BadRequest("Invalid workout data");
        }

        var existingWorkout = await _dbContext.Workouts.FindAsync(id);
        if (existingWorkout == null)
        {
            return NotFound();
        }

        existingWorkout.WorkoutType = workout.WorkoutType;
        existingWorkout.WorkoutStartTime = workout.WorkoutStartTime;
        existingWorkout.WorkoutEndTime = workout.WorkoutEndTime;

        await _dbContext.SaveChangesAsync();
        return Ok("Workout updated successfully");
    }
    
    [HttpPost("addUserWorkout/{userId}/{workoutId}")]
    public async Task<IActionResult> AddUserWorkout(string userId, int workoutId)
    {
        var user = await _dbContext.Users.FindAsync(userId);
        if (user == null)
        {
            return BadRequest("User does not exist");
        }

        var workout = await _dbContext.Workouts.FindAsync(workoutId);
        if (workout == null)
        {
            return BadRequest("Workout does not exist");
        }

        user.Workouts ??= new List<Workouts>();

        user.Workouts.Add(workout);

        try
        {
            await _dbContext.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while saving the workout: {ex.Message}");
        }

        var workoutDto = new WorkoutDTO
        {
            WorkoutId = workout.WorkoutId,
            WorkoutType = workout.WorkoutType,
            WorkoutStartTime = workout.WorkoutStartTime,
            WorkoutEndTime = workout.WorkoutEndTime,
        };

        return Ok(workoutDto);
    }
    
    [HttpGet("getUserWorkouts/{userId}")]
    [Authorize(Roles = "User, Manager, Trainer")]

    public async Task<IActionResult> GetUserWorkouts(string userId)
    {
        var user = await _dbContext.Users
            .Include(u => u.Workouts)
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (user == null)
        {
            return NotFound("User does not exist");
        }

        var workoutsDto = user.Workouts.Select(w => new WorkoutDTO
        {
            WorkoutId = w.WorkoutId,
            WorkoutType = w.WorkoutType,
            WorkoutStartTime = w.WorkoutStartTime,
            WorkoutEndTime = w.WorkoutEndTime,
        }).ToList();

        return Ok(workoutsDto);
    }


}




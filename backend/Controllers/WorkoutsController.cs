using Asp.Versioning;
using backend.DbContext;
using backend.DTO;
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
    public async Task<IActionResult> UpdateWorkout(int id, [FromBody] Workouts workout)
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
    
    // [HttpPost("addUserWorkout/{userId}")]
    // public async Task<IActionResult> AddUserWorkout(string userId, [FromBody] WorkoutDTO workoutDto)
    // {
    //     // var user = await _dbContext.Users.FindAsync(userId);
    //
    //     var user = await _dbContext.Users
    //         .Include(u => u.Workouts)
    //         .FirstOrDefaultAsync(u => u.Id == userId);
    //     
    //     if (user == null)
    //     {
    //         return BadRequest("User does not exist");
    //     }
    //   
    //     if (workoutDto == null)
    //     {
    //         return BadRequest("Workout data is required");
    //     }
    //
    //     var workout = new Workouts
    //     {
    //         UserId = userId,
    //         WorkoutType = workoutDto.WorkoutType,
    //         WorkoutStartTime = workoutDto.WorkoutStartTime,
    //         WorkoutEndTime = workoutDto.WorkoutEndTime,
    //     };
    //
    //     user.Workouts.Add(workout); 
    //     await _dbContext.Workouts.AddAsync(workout);
    //     await _dbContext.SaveChangesAsync();
    //
    //     return Ok();
    // }
    
    [HttpPost("addUserWorkout/{userId}")]
    public async Task<IActionResult> AddUserWorkout(string userId, [FromBody] WorkoutDTO workoutDto)
    {
        if (workoutDto == null)
        {
            return BadRequest("Workout data is required");
        }

        var user = await _dbContext.Users.FindAsync(userId);
    
        if (user == null)
        {
            return BadRequest("User does not exist");
        }

        var workout = new Workouts
        {
            UserId = userId,
            WorkoutType = workoutDto.WorkoutType,
            WorkoutStartTime = workoutDto.WorkoutStartTime,
            WorkoutEndTime = workoutDto.WorkoutEndTime,
            ClassId = workoutDto.ClassId // Ensure ClassId is set if it's required
        };

        // Check if workout properties are correctly set
        if (string.IsNullOrEmpty(workout.WorkoutType) ||
            string.IsNullOrEmpty(workout.WorkoutStartTime) ||
            string.IsNullOrEmpty(workout.WorkoutEndTime))
        {
            return BadRequest("All workout details are required");
        }

        user.Workouts.Add(workout);
        await _dbContext.Workouts.AddAsync(workout);

        try
        {
            await _dbContext.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            // Log the exception for debugging purposes
            // Log.Error(ex, "An error occurred while saving the workout");
            return StatusCode(500, $"An error occurred while saving the workout: {ex.Message}");
        }

        return Ok(workout); // Return the created workout for confirmation
    }
    
    
    [HttpGet("getUserWorkouts/{userId}")]
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




using backend.DbContext; // Assuming this is the correct namespace
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{


public class WorkoutplansController : Controller
{
    private readonly ApplicationDbContext _dbContext;

    // Database Injection
    public WorkoutplansController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Get all workout plans.
    // [EnableCors("_myAllowSpecificOrigins")]  // Uncomment if using CORS
    [HttpGet("getAllWorkoutsplans")]
    public async Task<List<WorkoutPlans>> GetAllWorkouts()
    {
        // Get all workout plans from the database
        return await _dbContext.WorkoutPlans.ToListAsync();
    }


    [HttpPost("addWorkoutplans")]
    public async Task<IActionResult> AddWorkoutPlans([FromBody]WorkoutPlans workoutplans)
    {
        if (workoutplans is null)
        {
            return BadRequest();
        }

        // Add the new workout plan to the database
        await _dbContext.AddAsync(workoutplans);
        await _dbContext.SaveChangesAsync();
        return Ok();
    }






    [HttpGet("getWorkoutplans/{id}")]
    // [EnableCors("_myAllowSpecificOrigins")]  // Uncomment if using CORS
    public async Task<IActionResult> GetWorkoutPlansById(int id)
    {
        // Get the workout plan with the specified ID from the database
        var workoutplan = await _dbContext.WorkoutPlans.FindAsync(id);
        if (workoutplan == null)
        {
            return NotFound();
        }

        return Ok(workoutplan);
    }

    // Delete a workout plan by ID.
    [HttpDelete("deleteWorkoutplans/{id}")]
    public async Task<IActionResult> DeleteWorkoutPlans(int id)
    {
        // Get the workout plan with the specified ID from the database
        var workoutplan = await _dbContext.WorkoutPlans.FindAsync(id);
        if (workoutplan == null)
        {
            return NotFound();
        }

        // Remove the workout plan from the database
        _dbContext.WorkoutPlans.Remove(workoutplan);
        await _dbContext.SaveChangesAsync();
        return Ok("Workout plan deleted successfully");
    }
        
    [HttpPut("updateWorkoutplans/{id}")]
    public async Task<IActionResult> UpdateWorkoutPlans(int id, [FromBody] WorkoutPlans updatedWorkout)
    {
        if (updatedWorkout == null || id <= 0 || id != updatedWorkout.WorkoutPlanId) // Check for null, invalid id, and ID mismatch
        {
            return BadRequest("Invalid workout plan data");
        }

        var existingWorkoutPlan = await _dbContext.WorkoutPlans.FindAsync(id);
        if (existingWorkoutPlan == null)
        {
            return NotFound("Workout plan not found.");
        }

        // Update specific properties using reflection (optional)
        // Update only allowed properties based on your model and security considerations
        // You might need to modify this based on your specific needs
        var updateProperties = typeof(WorkoutPlans).GetProperties()
            .Where(p => p.CanWrite && p.Name != "Id"); // Exclude Id property

        foreach (var property in updateProperties)
        {
            property.SetValue(existingWorkoutPlan, property.GetValue(updatedWorkout));
        }

      

        try
        {
            _dbContext.Entry(existingWorkoutPlan).State = EntityState.Modified; // Mark entity as modified
            await _dbContext.SaveChangesAsync();
            return Ok("Workout plan updated successfully");
        }
        catch (DbUpdateException ex)
        {
            // Handle database exceptions here (consider logging the exception)
            return StatusCode(500, "An error occurred while updating the workout plan.");
        }
    }


        


    }






}

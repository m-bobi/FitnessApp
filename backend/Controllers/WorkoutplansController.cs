using Asp.Versioning;
using backend.DbContext;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;
[ApiVersion( 1.0 )]
[Route("api/[controller]" )]
public class WorkoutplansController : Controller
{
    private readonly ApplicationDbContext _dbContext;

    // Database Injection
    public WorkoutplansController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Get all workout plans.
    [HttpGet("getAllWorkoutsplans")]
    [Authorize(Roles = "User, Manager, Trainer")]
    public async Task<List<WorkoutPlans>> GetAllWorkouts()
    {
        // Get all workout plans from the database
        return await _dbContext.WorkoutPlans.ToListAsync();
    }


    [HttpPost("addWorkoutplans")]
    [Authorize(Roles = "Manager, Trainer")]

    public async Task<IActionResult> AddWorkoutPlans([FromBody]WorkoutPlans workoutplans)
    {
        if (workoutplans is null)
        {
            return BadRequest();
        }

        await _dbContext.AddAsync(workoutplans);
        await _dbContext.SaveChangesAsync();
        return Ok();
    }


    [HttpGet("getWorkoutplans/{id}")]
    [Authorize(Roles = "Manager, Trainer")]

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

    [HttpDelete("deleteWorkoutplans/{id}")]
    [Authorize(Roles = "Manager, Trainer")]

    public async Task<IActionResult> DeleteWorkoutPlans(int id)
    {
        var workoutplan = await _dbContext.WorkoutPlans.FindAsync(id);
        if (workoutplan == null)
        {
            return NotFound();
        }

        _dbContext.WorkoutPlans.Remove(workoutplan);
        await _dbContext.SaveChangesAsync();
        return Ok("Workout plan deleted successfully");
    }
        
    [HttpPut("updateWorkoutplans/{id}")]
    [Authorize(Roles = "Manager, Trainer")]

    public async Task<IActionResult> UpdateWorkoutPlans(int id, [FromBody] WorkoutPlans updatedWorkout)
    {
        if (updatedWorkout == null || updatedWorkout.WorkoutPlanId == 0)
        {
            return BadRequest("Invalid workout plan data");
        }

        var existingWorkoutPlan = await _dbContext.WorkoutPlans.FindAsync(id);
        if (existingWorkoutPlan == null)
        {
            return NotFound("Workout plan not found.");
        }

        var updateProperties = typeof(WorkoutPlans).GetProperties()
            .Where(p => p.CanWrite && p.Name != "Id"); // Exclude Id property

        foreach (var property in updateProperties)
        {
            property.SetValue(existingWorkoutPlan, property.GetValue(updatedWorkout));
        }

        try
        {
            _dbContext.Entry(existingWorkoutPlan).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return Ok("Workout plan updated successfully");
        }
        catch (DbUpdateException ex)
        {
            return StatusCode(500, "An error occurred while updating the workout plan.");
        }
    }


}
using backend.DbContext;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

public class GymController : Controller
{
    private readonly ApplicationDbContext _dbContext;
    
    //Database Injection

    public GymController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }


  
    [HttpGet("getAllGyms")]

    public async Task<List<Gym>> GetAllGyms()
    {
        return await _dbContext.Gym.ToListAsync();
    }


    [HttpGet("addGym")]
    
        public async Task<IActionResult> AddGym([FromBody]Gym gym)
        {
            if (gym is null)
            {
                return BadRequest();
            }

            await _dbContext.AddAsync(gym);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }


    // Create API to get a specific order by ID.
    [HttpGet("getGym/{id}")]
    // [EnableCors("_myAllowSpecificOrigins")]
    public async Task<IActionResult> GetGymById(int id)
    {
        var gym = await _dbContext.Gym.FindAsync(id);
        if (gym == null)
        {
            return NotFound();
        }
        return Ok(gym);
    }

    // Create API to delete an order by ID.
    [HttpDelete("deleteGym/{id}")]
    // [EnableCors("_myAllowSpecificOrigins")]
    public async Task<IActionResult> DeleteGym(int id)
    {
        var gym = await _dbContext.Gym.FindAsync(id);
        if (gym == null)
        {
            return NotFound();
        }

        _dbContext.Gym.Remove(gym);
        await _dbContext.SaveChangesAsync();
        return Ok("Gym deleted successfully");
    }

    [HttpPut("updateGym/{id}")]
    public async Task<IActionResult> UpdateGym(int id, [FromBody] Gym updatedGymProperties) // Only accept specific properties
    {
        if (updatedGymProperties is null || id <= 0) // Check for null and invalid id
        {
            return BadRequest("Invalid gym data");
        }

        var existingGym = await _dbContext.Gym.FindAsync(id);
        if (existingGym == null)
        {
            return NotFound();
        }
        
        _dbContext.Entry(existingGym).State = EntityState.Modified; // Mark entity as modified
        try
        {
            await _dbContext.SaveChangesAsync();
            return Ok("Gym updated successfully");
        }
        catch (DbUpdateException ex)
        {
            // Handle database exceptions here
            return StatusCode(500, "An error occurred while updating the gym.");
        }
    }





}





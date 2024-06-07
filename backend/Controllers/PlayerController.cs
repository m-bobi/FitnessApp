using Asp.Versioning;
using backend.DbContext;
using backend.DTO;
using backend.Enums;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;
[ApiVersion( 1.0 )]
[Route("api/[controller]" )]

public class PlayerController : Controller
{
    private readonly ApplicationDbContext _dbContext;

    public PlayerController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }


    [HttpGet("getAllPlayers")]
    public async Task<List<Player>> GetAllTeams()
    {
        return await _dbContext.Player.ToListAsync();
    }


    [HttpPost("addPlayer")]
    public async Task<IActionResult> AddPlayer( [FromBody]Player player)
    {
        if (player is null)
        {
            return BadRequest();
        }

        await _dbContext.AddAsync(player);
        await _dbContext.SaveChangesAsync();
        return Ok();
    }
    
    [HttpDelete("deletePlayer/{id}")]
    public async Task<IActionResult> DeletePlayer(int id)
    {
        var player = await _dbContext.Player.FindAsync(id);
        if (player == null)
        {
            return NotFound();
        }
    
        _dbContext.Player.Remove(player);
        await _dbContext.SaveChangesAsync();
        return Ok("Trainer deleted successfully");
    }
    
    


    //
    //
    //
    //
    // // Create API to get a specific order by ID.
    // [HttpGet("getTrainer/{id}")]
    // // [EnableCors("_myAllowSpecificOrigins")]
    // public async Task<IActionResult> GetTrainerById(int id)
    // {
    //     var trainer = await _dbContext.Trainers.FindAsync(id);
    //     if (trainer == null)
    //     {
    //         return NotFound();
    //     }
    //     return Ok(trainer);
    // }
    //
    // // Create API to delete an order by ID.
    // [HttpDelete("deleteTrainer/{id}")]
    // public async Task<IActionResult> DeleteTrainer(int id)
    // {
    //     var trainer = await _dbContext.Trainers.FindAsync(id);
    //     if (trainer == null)
    //     {
    //         return NotFound();
    //     }
    //
    //     _dbContext.Trainers.Remove(trainer);
    //     await _dbContext.SaveChangesAsync();
    //     return Ok("Trainer deleted successfully");
    // }
    //
    // // Create API to update an existing order.
    // [HttpPut("updateTrainer/{id}")]
    // // [EnableCors("_myAllowSpecificOrigins")]
    // public async Task<IActionResult> UpdateTrainer([FromBody] Trainers trainer)
    // {
    //     if (trainer is null || trainer.TrainerId == 0)
    //     {
    //         return BadRequest("Invalid trainer data");
    //     }
    //
    //     var existingtrainer = await _dbContext.Trainers.FindAsync(trainer.TrainerId);
    //     if (existingtrainer == null)
    //     {
    //         return NotFound();
    //     }
    //
    //     _dbContext.Entry(existingtrainer).CurrentValues.SetValues(trainer);
    //     await _dbContext.SaveChangesAsync();
    //     return Ok("Trainer updated successfully");
    // }
    //
    // // FOR FUTURE USES.
    // [HttpPut("assignTrainerToClass")]
    // public async Task<IActionResult> AssignTrainerToClass(string trainerId, int classId)
    // {
    //     var trainer = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == trainerId && u.Role == Roles.Trainer);
    //     if (trainer == null)
    //     {
    //         return NotFound("Trainer not found or not assigned as trainer.");
    //     }
    //
    //     var existingClass = await _dbContext.Class.FirstOrDefaultAsync(c => c.ClassId == classId);
    //     if (existingClass == null)
    //     {
    //         return NotFound("Class not found.");
    //     }
    //
    //     existingClass.TrainerId = trainerId;
    //     await _dbContext.SaveChangesAsync();
    //     return Ok("Trainer assigned to class successfully!");
    // }
}





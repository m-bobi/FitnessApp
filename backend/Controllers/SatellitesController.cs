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

public class SatellitesController : Controller
{
    private readonly ApplicationDbContext _dbContext;

    public SatellitesController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }


    [HttpGet("getAllSatellites")]
    public async Task<List<Satellite>> GetAllSatellites()
    {
        return await _dbContext.Satellites.ToListAsync();
    }


    [HttpPost("addSatellite")]
    public async Task<IActionResult> AddSatellite( [FromBody]Satellite satellite)
    {
        if (satellite is null)
        {
            return BadRequest();
        }

        await _dbContext.AddAsync(satellite);
        await _dbContext.SaveChangesAsync();
        return Ok();
    }
    
    [HttpGet("{planetName}")]
    public async Task<ActionResult<IEnumerable<Satellite>>> GetSatellites(string planetName)
    {
        var planet = await _dbContext.Planets
            .FirstOrDefaultAsync(p => p.Name == planetName);

        if (planet == null)
        {
            return NotFound();
        }

        var satellites = await _dbContext.Satellites
            .Where(s => s.PlanetID == planet.PlanetID && !s.IsDeleted)
            .ToListAsync();

        return satellites;
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSatellite(int id)
    {
        var satellite = await _dbContext.Satellites.FindAsync(id);
        if (satellite == null)
        {
            return NotFound();
        }

        satellite.IsDeleted = true;
        await _dbContext.SaveChangesAsync();

        return NoContent();
    }
    

}
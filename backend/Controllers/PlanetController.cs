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

public class PlanetController : Controller
{
    private readonly ApplicationDbContext _dbContext;

    public PlanetController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }


    [HttpGet("getAllPlanets")]
    public async Task<List<Planet>> GetAllPlanets()
    {
        return await _dbContext.Planets.ToListAsync();
    }


    [HttpPost("addPlanet")]
    public async Task<IActionResult> AddPlanet( [FromBody]Planet planet)
    {
        if (planet is null)
        {
            return BadRequest();
        }

        await _dbContext.AddAsync(planet);
        await _dbContext.SaveChangesAsync();
        return Ok();
    }
    
    
    [HttpGet("{name}")]
    public async Task<ActionResult<Planet>> GetPlanet(string name)
    {
        var planet = await _dbContext.Planets
            .FirstOrDefaultAsync(p => p.Name == name);

        if (planet == null)
        {
            return NotFound();
        }

        var satellites = await _dbContext.Satellites
            .Where(s => s.PlanetID == planet.PlanetID && !s.IsDeleted)
            .ToListAsync();

        

        return planet;
    }
    
    [HttpPut("{name}")]
    public async Task<IActionResult> UpdatePlanetType(string name, string newType)
    {
        var planet = await _dbContext.Planets.FirstOrDefaultAsync(p => p.Name == name);
        if (planet == null)
        {
            return NotFound();
        }

        planet.Type = newType;
        await _dbContext.SaveChangesAsync();

        return NoContent();
    }
    
    


}





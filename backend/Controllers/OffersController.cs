using backend.DbContext;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

public class OffersController : Controller
{
    private readonly ApplicationDbContext _dbContext;

    // Database Injection
    public OffersController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

  
    [HttpGet("getAllOffers")]
    public async Task<List<Offers>> GetAllOffers()
    {
        return await _dbContext.Offers.ToListAsync();
    }


    [HttpPost("addOffer")]
    public async Task<IActionResult> AddOffer( [FromBody]Offers offers)
    {
        if (offers is null)
        {
            return BadRequest();
        }

        await _dbContext.AddAsync(offers);
        await _dbContext.SaveChangesAsync();
        return Ok();
    }

    // Create API to get a specific order by ID.
    [HttpGet("getOffer/{id}")]
    // [EnableCors("_myAllowSpecificOrigins")]
    public async Task<IActionResult> GetOfferById(int id)
    {
        var offer = await _dbContext.Offers.FindAsync(id);
        if (offer == null)
        {
            return NotFound();
        }
        return Ok(offer);
    }

    // Create API to delete an order by ID.
    [HttpDelete("deleteOffer/{id}")]
    // [EnableCors("_myAllowSpecificOrigins")]
    public async Task<IActionResult> DeleteOffer(int id)
    {
        var offer = await _dbContext.Offers.FindAsync(id);
        if (offer == null)
        {
            return NotFound();
        }

        _dbContext.Offers.Remove(offer);
        await _dbContext.SaveChangesAsync();
        return Ok("Offer deleted successfully");
    }

    // Create API to update an existing order.
    [HttpPut("updateOffer/{id}")]
    public async Task<IActionResult> UpdateOffer([FromBody] Offers offer)
    {
        if (offer is null || offer.OfferId == 0)
        {
            return BadRequest("Invalid offer data");
        }

        var existingOffer = await _dbContext.Offers.FindAsync(offer.OfferId);
        if (existingOffer == null)
        {
            return NotFound();
        }

        _dbContext.Entry(existingOffer).CurrentValues.SetValues(offer);
        await _dbContext.SaveChangesAsync();
        return Ok("Offer updated successfully");
    }




}





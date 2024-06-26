using Asp.Versioning;
using backend.DbContext;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;

namespace backend.Controllers;
[ApiVersion( 1.0 )]
[Route("api/[controller]" )]
public class OffersController : Controller
{
    private readonly ApplicationDbContext _dbContext;
    private IStripeClient _stripeClient;

    // Database Injection
    public OffersController(ApplicationDbContext dbContext, IStripeClient stripeClient)
    {
        _dbContext = dbContext;
        _stripeClient = stripeClient;
    }

  
    [HttpGet("getAllOffers")]
    public async Task<List<Offers>> GetAllOffers()
    {
        return await _dbContext.Offers.ToListAsync();
    }


    [HttpPost("addOffer")]
    [Authorize(Roles = "Manager")]
    public async Task<IActionResult> AddOffer([FromBody] Offers offer)
    {
        if (offer is null)
        {
            return BadRequest();
        }

        // Create a corresponding product in Stripe
        var options = new ProductCreateOptions
        {
            Name = offer.OfferType,
            Description = offer.OfferDescription,
        };

        var service = new ProductService(_stripeClient);
        Product stripeProduct = await service.CreateAsync(options);

        var priceOptions = new PriceCreateOptions
        {
            UnitAmount = (long)(offer.OfferPrice * 100),
            Currency = "usd", 
            Product = stripeProduct.Id,
        };

        var priceService = new PriceService();
        Price stripePrice = await priceService.CreateAsync(priceOptions);

        offer.StripePriceId = stripePrice.Id;

        await _dbContext.AddAsync(offer);
        await _dbContext.SaveChangesAsync();
        return Ok();
    }

    // Create API to get a specific order by ID.
    [HttpGet("getOffer/{id}")]
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
    [Authorize(Roles = "Manager")]
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
[Authorize(Roles = "Manager")]

public async Task<IActionResult> UpdateOffer(int id, [FromBody] Offers offer)
{
    if (offer is null)
    {
        return BadRequest("Invalid offer data");
    }

    var existingOffer = await _dbContext.Offers.FindAsync(id);
    if (existingOffer == null)
    {
        return NotFound();
    }

    existingOffer.OfferType = offer.OfferType;
    existingOffer.OfferDescription = offer.OfferDescription;
    existingOffer.OfferPrice = offer.OfferPrice;

    await _dbContext.SaveChangesAsync();
    return Ok("Offer updated successfully");
}




}





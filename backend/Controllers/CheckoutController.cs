using Asp.Versioning;
using backend.DbContext;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;

namespace backend.Controllers;
[ApiVersion( 1.0 )]
public class CheckoutController : Controller
{
    
private readonly ApplicationDbContext _dbContext;
private readonly IStripeClient _stripeClient;

public CheckoutController(ApplicationDbContext dbContext, IStripeClient stripeClient)
{
    _dbContext = dbContext;
    _stripeClient = stripeClient;    
}
    
    [HttpPost("checkout/{productId}")]
    public async Task<IActionResult> CreateCheckoutSession(int productId, int quantity = 1)
    {
        var product = await _dbContext.Products.FindAsync(productId);
        if (product == null) return NotFound();

        var options = new SessionCreateOptions
        {
            PaymentMethodTypes = new List<string>
            {
                "card",
            },
            LineItems = new List<SessionLineItemOptions>
            {
                new()
                {
                    Price = product.StripePriceId,
                    Quantity = quantity,
                },
            },
            Mode = "payment",
            SuccessUrl = "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
            CancelUrl = "http://localhost:3000/cancelled",
        };

        var service = new SessionService(_stripeClient);
        var session = await service.CreateAsync(options);
        Response.Headers.Append("Location", session.Url);
        return new JsonResult(new { id = session.Id });
    }
    
    [HttpPost("checkoutOffer/{offerId}")]
    public async Task<IActionResult> CreateCheckoutSessionOffer(int offerId, int quantity = 1)
    {
        var offer = await _dbContext.Offers.FindAsync(offerId);
        if (offer == null) return NotFound();

        var options = new SessionCreateOptions
        {
            PaymentMethodTypes = new List<string>
            {
                "card",
            },
            LineItems = new List<SessionLineItemOptions>
            {
                new()
                {
                    Price = offer.StripePriceId,
                    Quantity = quantity,
                },
            },
            Mode = "payment",
            SuccessUrl = "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
            CancelUrl = "http://localhost:3000/cancelled",
        };

        var service = new SessionService(_stripeClient);
        var session = await service.CreateAsync(options);
        Response.Headers.Append("Location", session.Url);
        return new JsonResult(new { id = session.Id });
    }
}
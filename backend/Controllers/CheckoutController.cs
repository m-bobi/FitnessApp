using System.Security.Claims;
using Asp.Versioning;
using backend.DbContext;
using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;
using Stripe.Checkout;

namespace backend.Controllers;
[ApiVersion( 1.0 )]
public class CheckoutController : Controller
{
    
private readonly ApplicationDbContext _dbContext;
private readonly IStripeClient _stripeClient;
private readonly UserManager<User> _userManager;
public CheckoutController(ApplicationDbContext dbContext, IStripeClient stripeClient, UserManager<User> userManager)
{
    _dbContext = dbContext;
    _stripeClient = stripeClient;
    _userManager = userManager;
}

    
[HttpPost("checkout/{productId}")]
public async Task<IActionResult> CreateCheckoutSession(int productId, int quantity = 1)
{
        if (!User.Identity.IsAuthenticated)
        {
            return Unauthorized("User is not authenticated");
        }
        
        var product = await _dbContext.Products.FindAsync(productId);
        if (product == null) return NotFound();
        
        var userIdClaims = User.FindAll(ClaimTypes.NameIdentifier).ToList();
        if (userIdClaims.Count < 2)
        {
            return Unauthorized("Invalid token");
        }

        var userId = userIdClaims[1].Value;

        var currentUser = await _userManager.FindByIdAsync(userId);

        if (currentUser == null)
        {
            return Unauthorized("User not found");
        }
        
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
        
        if (session == null)
        {
            return BadRequest("Failed to create session");
        }
        
        var order = new Orders
        {
            OrderTotalAmount = product.ProductPrice * quantity,
            OrderStatus = "Pending",
            UserId = currentUser.Id,
            ProductId = product.ProductId.GetValueOrDefault(),
        };

        _dbContext.Orders.Add(order);
        await _dbContext.SaveChangesAsync();

        var orderDto = new OrderDTO
        {
            OrderId = order.OrderId,
            OrderDate = order.OrderDate,
            OrderTotalAmount = order.OrderTotalAmount,
            OrderStatus = order.OrderStatus,
            UserId = order.UserId,
            UserName = currentUser.UserName,
            ProductId = order.ProductId,
            ProductName = product.ProductName,
            ProductDescription = product.ProductDescription
        };
        
        
        Response.Headers.Append("Location", session.Url);
        return new JsonResult(new { id = session.Id, order = orderDto });
        
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
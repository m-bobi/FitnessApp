using Asp.Versioning;
using backend.DbContext;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;
using Stripe.Checkout;

namespace backend.Controllers;
[ApiVersion( 1.0 )]
[Route("api/[controller]" )]
public class ProductsController : Controller
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IStripeClient _stripeClient;
    public ProductsController(ApplicationDbContext dbContext, IStripeClient stripeClient)
    {
        _dbContext = dbContext;
        _stripeClient = stripeClient;
    }

    // Create API to get all Products with pagination.
    [HttpGet("getAllProducts")]
    public async Task<ActionResult<IEnumerable<Products>>> GetAllProducts(int page = 1, int limit = 10)
    {
        try
        {
            var totalProducts = await _dbContext.Products.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalProducts / limit);

            var product = await _dbContext.Products
                .OrderByDescending(o => o.ProductId)
                .Skip((page - 1) * limit)
                .Take(limit)
                .ToListAsync();

            return Ok(new { product, totalPages });
        }
        catch (Exception ex)
        {
            // Error Logging
            Console.WriteLine("Error fetching Products: " + ex.Message);
            return StatusCode(500, "Internal server error");
        }
    }
    
    [HttpGet("getAllofProducts")]
    public async Task<List<Products>> GetAllofProducts()
    {
        return await _dbContext.Products.ToListAsync();
    }

    // Create API to add an Product.
    [HttpPost("addProduct")]
    [Authorize(Roles = "Manager")]

    public async Task<IActionResult> AddProduct([FromBody] Products product)
    {
        if (product is null)
        {
            return BadRequest();
        }

        // Create a corresponding product in Stripe
        var options = new ProductCreateOptions
        {
            Name = product.ProductName,
            Description = product.ProductDescription,
            Images = new List<string> { product.ProductImage } // will work even if we send one image, stripe expects an array of images
        };

        var service = new ProductService(_stripeClient);
        Product stripeProduct = await service.CreateAsync(options);


        product.StripeProductId = stripeProduct.Id;

        var priceOptions = new PriceCreateOptions
        {
            UnitAmount = (long)(product.ProductPrice * 100),
            Currency = "usd", 
            Product = product.StripeProductId, 
        };

        var priceService = new PriceService();
        Price stripePrice = await priceService.CreateAsync(priceOptions);
        product.StripePriceId = stripePrice.Id;

        await _dbContext.AddAsync(product);
        await _dbContext.SaveChangesAsync();
        return Ok();
    }


    // Create API to get a specific Product by ID.
    [HttpGet("getProduct/{id}")]
    public async Task<IActionResult> GetProductById(int id)
    {
        var product = await _dbContext.Products.FindAsync(id);
        if (product == null) return NotFound();
        return Ok(product);
    }

    // Create API to delete an Product by ID.
    [HttpDelete("deleteProduct/{id}")]
    [Authorize(Roles = "Manager")]

    public async Task<IActionResult> DeleteProduct(int id)
    {
        var product = await _dbContext.Products.FindAsync(id);
        if (product == null) return NotFound();

        _dbContext.Products.Remove(product);
        await _dbContext.SaveChangesAsync();
        return Ok("Product deleted successfully");
    }

    [HttpPut("updateProduct/{id}")]
    [Authorize(Roles = "Manager")]

    public async Task<IActionResult> UpdateProduct(int id, [FromBody] Products product)
    {
        if (product is null)
        {
            return BadRequest("Invalid Product data");
        }

        var existingProduct = await _dbContext.Products.FirstOrDefaultAsync(p => p.ProductId == id);
        if (existingProduct == null)
        {
            return NotFound();
        }

        existingProduct.ProductName = product.ProductName;
        existingProduct.ProductDescription = product.ProductDescription;
        existingProduct.ProductPrice = product.ProductPrice;
        existingProduct.ProductCategory = product.ProductCategory;
        existingProduct.ProductStock = product.ProductStock;
        existingProduct.ProductRate = product.ProductRate;

        await _dbContext.SaveChangesAsync();
        return Ok("Product updated successfully");
    }
   }
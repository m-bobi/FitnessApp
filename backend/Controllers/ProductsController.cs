using Asp.Versioning;
using backend.DbContext;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;
[ApiVersion( 1.0 )]
[Route("api/[controller]" )]
public class ProductsController : Controller
{
    private readonly ApplicationDbContext _dbContext;

    // Database Injection
    public ProductsController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
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
    public async Task<IActionResult> AddProduct([FromBody] Products product)
    {
        if (product is null)
        {
            return BadRequest();
        }

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
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var product = await _dbContext.Products.FindAsync(id);
        if (product == null) return NotFound();

        _dbContext.Products.Remove(product);
        await _dbContext.SaveChangesAsync();
        return Ok("Product deleted successfully");
    }

    // Create API to update an existing Product.
    [HttpPut("updateProduct/{id}")]
    public async Task<IActionResult> UpdateProduct([FromBody] Products product)
    {
        if (product is null || product.ProductId == 0) return BadRequest("Invalid Product data");

        var existingProduct = await _dbContext.Products.FindAsync(product.ProductId);
        if (existingProduct == null) return NotFound();

        _dbContext.Entry(existingProduct).CurrentValues.SetValues(product);
        await _dbContext.SaveChangesAsync();
        return Ok("Product updated successfully");
    }
}



using backend.DbContext;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[Route("api/[controller]" )]

public class UploadImagesController : Controller
{
    private readonly ApplicationDbContext _dbContext;
    
    public UploadImagesController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    
    
    [HttpPost("addUserImage")]
    public async Task<IActionResult> AddUserImage(IFormFile image)
    {
        if (image == null || image.Length == 0)
        {
            return BadRequest("Please upload a picture!");
        }

        var allowedExtensions = new[] { ".png", ".jpg", ".jpeg", ".webp" };
        var fileExtension = Path.GetExtension(image.FileName).ToLower();
        if (!allowedExtensions.Contains(fileExtension))
        {
            return BadRequest("Only .png, .jpg, .jpeg, and .webp file formats are allowed.");
        }

        var unicNameOfImage = GenerateUnicNameOfImage(image.FileName);
    
        var folder = Path.Combine("..", "frontend", "public", "img", "users", unicNameOfImage); 

        using (var stream = new FileStream(folder, FileMode.Create))
        {
            await image.CopyToAsync(stream);
        }

        return Ok(unicNameOfImage);
    }
    
    [HttpPost("addProductImage")]
    public async Task<IActionResult> AddProductImage(IFormFile image)
    {
        if (image == null || image.Length == 0)
        {
            return BadRequest("Please upload a picture!");
        }

        var allowedExtensions = new[] { ".png", ".jpg", ".jpeg", ".webp" };
        var fileExtension = Path.GetExtension(image.FileName).ToLower();
        if (!allowedExtensions.Contains(fileExtension))
        {
            return BadRequest("Only .png, .jpg, .jpeg, and .webp file formats are allowed.");
        }

        var unicNameOfImage = GenerateUnicNameOfImage(image.FileName);
    
        var folder = Path.Combine("..", "frontend", "public", "img", "products", unicNameOfImage); 

        using (var stream = new FileStream(folder, FileMode.Create))
        {
            await image.CopyToAsync(stream);
        }

        return Ok(unicNameOfImage);
    }

    private string GenerateUnicNameOfImage(string imageName)
    {
        string unicNameOfImage = Guid.NewGuid().ToString("N") + Path.GetExtension(imageName);
        return unicNameOfImage;
    }
}





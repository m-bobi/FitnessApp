


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
    
    
    
    [HttpPost]
    [Route("addUserImage")]
    public async Task<IActionResult> AddUserImage(IFormFile image)
    {
        if (image == null || image.Length == 0)
        {
            return BadRequest("Ju lutem vendosni foton");
        }


        var folder = Path.Combine("..", "frontend", "public", "img", "users", image.FileName);

        using (var stream = new FileStream(folder, FileMode.Create))
        {
            await image.CopyToAsync(stream);
        }

        return Ok(image.FileName);
    }


    // private string GenerateUnicImageName(string emriFotos)
    // {
    //     string emriUnikIFotos = Guid.NewGuid().ToString("N") + Path.GetExtension(emriFotos);
    //
    //     return emriUnikIFotos;
    // }


}





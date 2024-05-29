
using backend.DbContext;
using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[Route("api/[controller]" )]

public class ContactController : Controller
{
    private readonly ApplicationDbContext _dbContext;

    public ContactController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }


    [HttpGet("getAllContacts")]
    public async Task<List<Contact>> GetAllContacts()
    {
        return await _dbContext.Contact.ToListAsync();
    }


    [HttpPost("addContact")]
    public async Task<IActionResult> AddContact([FromBody] Contact contact)
    {
        if (contact is null)
        {
            return BadRequest();
        }

        await _dbContext.AddAsync(contact);
        await _dbContext.SaveChangesAsync();
        return Ok();
    }
    
    [HttpDelete("deleteContact/{id}")]
    public async Task<IActionResult> DeleteContact(int id)
    {
        var contact = await _dbContext.Contact.FindAsync(id);
        if (contact == null)
        {
            return NotFound();
        }

        _dbContext.Contact.Remove(contact);
        await _dbContext.SaveChangesAsync();
        return Ok("Contact deleted successfully");
    }
    



}
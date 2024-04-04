using System.Collections.Generic;
using System.Threading.Tasks;
using backend.DbContext;
using backend.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

public class OrdersController : Controller
{
    private readonly ApplicationDbContext _dbContext;

    // Database Injection
    public OrdersController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Create API to get all orders.
    [EnableCors("_myAllowSpecificOrigins")]
    [HttpGet("getAllOrders")]
    public async Task<List<Orders>> GetAllOrders()
    {
        return await _dbContext.Orders.ToListAsync();
    }
    

    // Create API to add an order.
    [EnableCors("_myAllowSpecificOrigins")]
    [HttpPost("addOrder")]
    public async Task<IActionResult> AddOrder(Orders order)
    {
        if (order is null)
        {
            return BadRequest();
        }
        else
        {
            await _dbContext.AddAsync(order);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
    }
    
    
    // Create API to get a specific order by ID.
    [EnableCors("_myAllowSpecificOrigins")]
    [HttpGet("getOrder/{id}")]
    public async Task<IActionResult> GetOrderById(int id)
    {
        var order = await _dbContext.Orders.FindAsync(id);
        if (order == null)
        {
            return NotFound();
        }
        return Ok(order);
    }
    
    // Create API to delete an order by ID.
    [EnableCors("_myAllowSpecificOrigins")]
    [HttpDelete("deleteOrder/{id}")]
    public async Task<IActionResult> DeleteOrder(int id)
    {
        var order = await _dbContext.Orders.FindAsync(id);
        if (order == null)
        {
            return NotFound();
        }

        _dbContext.Orders.Remove(order);
        await _dbContext.SaveChangesAsync();
        return Ok("Order deleted successfully");
    }

    // Create API to update an existing order.
    [EnableCors("_myAllowSpecificOrigins")]
    [HttpPut("updateOrder")]
    public async Task<IActionResult> UpdateOrder(Orders order)
    {
        if (order is null || order.OrderId == 0)
        {
            return BadRequest("Invalid order data");
        }

        var existingOrder = await _dbContext.Orders.FindAsync(order.OrderId);
        if (existingOrder == null)
        {
            return NotFound();
        }

        _dbContext.Entry(existingOrder).CurrentValues.SetValues(order);
        await _dbContext.SaveChangesAsync();
        return Ok("Order updated successfully");
    }
}



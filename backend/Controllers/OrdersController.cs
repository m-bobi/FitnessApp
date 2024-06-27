using backend.DbContext;
using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;
[ApiController]
[Route("api/[controller]")]
public class OrdersController : Controller
{
    private readonly ApplicationDbContext _dbContext;

    // Database Injection
    public OrdersController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }
[HttpGet("getAllOrders")]
[Authorize(Roles = "Manager")]
public async Task<ActionResult<IEnumerable<Orders>>> GetAllOrders(int page = 1, int limit = 10, string orderId = "", string orderStatus = "", string userId = "")
{
    try
    {
        var totalOrders = await _dbContext.Orders.CountAsync();
        var totalPages = (int)Math.Ceiling((double)totalOrders / limit);

        // Include User data to get the username
        var orders = await _dbContext.Orders
            .Where(o => (string.IsNullOrEmpty(orderId) || o.OrderId.ToString() == orderId) &&
                        (string.IsNullOrEmpty(orderStatus) || o.OrderStatus == orderStatus) &&
                        (string.IsNullOrEmpty(userId) || o.UserId == userId))
            .OrderByDescending(o => o.OrderId)
            .Skip((page - 1) * limit)
            .Take(limit)
            .ToListAsync();

        var ordersWithUsername = orders.Select(order => new
        {
            OrderId = order.OrderId,
            OrderDate = order.OrderDate,
            OrderTotalAmount = order.OrderTotalAmount,
            OrderStatus = order.OrderStatus,
            UserId = order.UserId,
            UserName = order.User.UserName
        });

        return Ok(new { orders, ordersWithUsername, totalPages });
    }
    catch (Exception ex)
    {
        Console.WriteLine("Error fetching orders: " + ex.Message);
        return StatusCode(500, "Internal server error");
    }
}

[HttpGet("getAllOrdersSimple")]
[Authorize(Roles = "Manager")]

public async Task<ActionResult<IEnumerable<OrderDTO>>> GetAllOrdersSimple()
{
    try
    {
        var orders = await _dbContext.Orders
            .Include(o => o.Product)
            .Select(o => new OrderDTO
            {
                OrderId = o.OrderId,
                OrderDate = o.OrderDate,
                OrderStatus = o.OrderStatus,
                OrderTotalAmount = o.OrderTotalAmount,
                UserId = o.UserId,
                ProductId = o.ProductId,
                ProductName = o.Product.ProductName,
                ProductDescription = o.Product.ProductDescription
            })
            .ToListAsync();

        return Ok(orders);
    }
    catch (Exception ex)
    {
        Console.WriteLine("Error fetching orders: " + ex.Message);
        return StatusCode(500, "Internal server error");
    }
}

    // Create API to add an order.
    [HttpPost("addOrder")]
    [Authorize(Roles = "Manager")]
    public async Task<IActionResult> AddOrder([FromBody] Orders order)
    {
        if (order is null)
        {
            return BadRequest();
        }

        await _dbContext.AddAsync(order);
        await _dbContext.SaveChangesAsync();
        return Ok();
    }


    // Create API to get a specific order by ID.
    [HttpGet("getOrder/{id}")]
    [Authorize(Roles = "Manager")]
    public async Task<IActionResult> GetOrderById(int id)
    {
        var order = await _dbContext.Orders.FindAsync(id);
        if (order == null) return NotFound();
        return Ok(order);
    }

    // Create API to delete an order by ID.
    [HttpDelete("deleteOrder/{id}")]
    [Authorize(Roles = "Manager")]
    public async Task<IActionResult> DeleteOrder(int id)
    {
        var order = await _dbContext.Orders.FindAsync(id);
        if (order == null) return NotFound();

        _dbContext.Orders.Remove(order);
        await _dbContext.SaveChangesAsync();
        return Ok("Order deleted successfully");
    }

    [HttpPut("updateOrder/{id}")]
    [Authorize(Roles = "Manager")]
    public async Task<IActionResult> UpdateOrder(int id, [FromBody]OrderDTO orderDto)
    {
        if (orderDto is null)
        {
            return BadRequest("Invalid order data");
        }

        var existingOrder = await _dbContext.Orders.FindAsync(id);
        if (existingOrder == null)
        {
            return NotFound();
        }

        existingOrder.OrderStatus = orderDto.OrderStatus;
        existingOrder.OrderDate = orderDto.OrderDate;
        existingOrder.UserId = orderDto.UserId;
        existingOrder.ProductId = orderDto.ProductId;
        existingOrder.OrderTotalAmount = orderDto.OrderTotalAmount;
        existingOrder.ProductName = orderDto.ProductName;
        existingOrder.ProductDescription = orderDto.ProductDescription;

        await _dbContext.SaveChangesAsync();
        return Ok("Order updated successfully!");
    }
    
    [HttpGet("getOrdersByUser/{userId}")]
    
    public async Task<ActionResult<IEnumerable<OrderDTO>>> GetOrdersByUser(string userId)
    {
        try
        {
            var orders = await _dbContext.Orders
                .Where(o => o.UserId == userId)
                .Select(o => new OrderDTO
                {
                    OrderId = o.OrderId,
                    OrderDate = o.OrderDate,
                    OrderTotalAmount = o.OrderTotalAmount,
                    OrderStatus = o.OrderStatus,
                    UserId = o.UserId,
                    ProductId = o.ProductId,
                    ProductName = o.Product.ProductName,
                    ProductDescription = o.Product.ProductDescription
                })
                .ToListAsync();

            if (orders == null || orders.Count == 0)
            {
                return NotFound("No orders found for this user");
            }

            return Ok(orders);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error");
        }
    }
}
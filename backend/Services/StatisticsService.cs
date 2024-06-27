using backend.DbContext;
using Microsoft.EntityFrameworkCore;
using backend.DTO;
using backend.Models;

namespace backend.Services;

public class StatisticsService : IStatisticsService
{
    private readonly ApplicationDbContext _context;

    public StatisticsService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> GetNewSignupsAsync()
    {
        var today = DateTime.UtcNow.Date;
        return await _context.Users.CountAsync(u => u.CreatedAt >= today);
    }

    public async Task<decimal> GetRevenueAsync()
    {
        return await _context.Orders.SumAsync(o => o.OrderTotalAmount);
    }

    public async Task<int> GetTrainersAsync()
    {
        return await _context.Trainers.CountAsync();
    }

    public async Task<int> GetClassesAsync()
    {
        return await _context.Class.CountAsync();
    }
    
    public async Task<List<RevenueData>> GetRevenueOverTimeAsync()
    {
        return await _context.Orders
            .GroupBy(o => o.OrderDate.Date)
            .Select(g => new RevenueData
            {
                Date = g.Key,
                Revenue = g.Sum(o => o.OrderTotalAmount)
            })
            .ToListAsync();
    }
}
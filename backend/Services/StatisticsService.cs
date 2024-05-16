using backend.DbContext;
using Microsoft.EntityFrameworkCore;

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
}
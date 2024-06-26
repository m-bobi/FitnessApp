using backend.Models;

namespace backend.Services;

public interface IStatisticsService
{
    Task<int> GetNewSignupsAsync();
    Task<decimal> GetRevenueAsync();
    Task<int> GetTrainersAsync();
    Task<int> GetClassesAsync();
    
    Task<List<RevenueData>> GetRevenueOverTimeAsync();
}
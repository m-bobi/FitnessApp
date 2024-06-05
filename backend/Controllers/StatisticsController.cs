using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StatisticsController : Controller
{
    private readonly IStatisticsService _statisticsService;

    public StatisticsController(IStatisticsService statisticsService)
    {
        _statisticsService = statisticsService;
    }

    [HttpGet("new-signups")]
    [Authorize(Roles = "Manager")]
    public async Task<IActionResult> GetNewSignups()
    {
        var newSignups = await _statisticsService.GetNewSignupsAsync();
        return Ok(newSignups);
    }

    [HttpGet("revenue")]
    [Authorize(Roles = "Manager")]
    public async Task<IActionResult> GetRevenue()
    {
        var revenue = await _statisticsService.GetRevenueAsync();
        return Ok(revenue);
    }

    [HttpGet("trainers")]
    [Authorize(Roles = "Manager")]
    public async Task<IActionResult> GetTrainers()
    {
        var trainers = await _statisticsService.GetTrainersAsync();
        return Ok(trainers);
    }

    [HttpGet("classes")]
    [Authorize(Roles = "Manager")]
    public async Task<IActionResult> GetClasses()
    {
        var totalClasses = await _statisticsService.GetClassesAsync();
        return Ok(totalClasses);
    }
    
    [HttpGet("revenueOverTime")]
    [Authorize(Roles = "Manager")]
    public async Task<IActionResult> GetRevenueOverTime()
    {
        var data = await _statisticsService.GetRevenueOverTimeAsync();
        return Ok(data);
    }
}

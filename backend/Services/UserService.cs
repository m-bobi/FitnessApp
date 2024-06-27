using backend.DbContext;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class UserService
{
    private readonly ApplicationDbContext _dbContext;
    private readonly UserManager<User> _userManager;

    public UserService(ApplicationDbContext dbContext, UserManager<User> userManager)
    {
        _dbContext = dbContext;
        _userManager = userManager;
    }

    public async Task<User?> GetUserByRefreshTokenAsync(string refreshToken)
    {
        // Find the user associated with the provided refresh token
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);
        return user;
    }
}
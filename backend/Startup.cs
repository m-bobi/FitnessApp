using backend.DbContext;
using Microsoft.EntityFrameworkCore;

namespace backend;

public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        // Replace with your connection string.
        var connectionString = "server=localhost;user=root;password=password;database=FitnessApp";

        var serverVersion = new MySqlServerVersion(ServerVersion.AutoDetect(connectionString));
        
        services.AddDbContext<UserDbContext>(
            dbContextOptions => dbContextOptions
                .UseMySql(connectionString, serverVersion)
                .LogTo(Console.WriteLine, LogLevel.Information)
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors()
        );
    }
}
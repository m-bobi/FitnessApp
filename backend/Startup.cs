// using backend.DbContext;
// using Microsoft.EntityFrameworkCore;
//
// namespace backend;
//
// public class Startup
// {
//     public void ConfigureServices(IServiceCollection services)
//     {
//         // Replace with your connection string.
//         var connectionString = "server=localhost;user=root;password=edoni12345678.;database=lab1";
//
//         // Replace with your server version and type.
//         // Use 'MariaDbServerVersion' for MariaDB.
//         // Alternatively, use 'ServerVersion.AutoDetect(connectionString)'.
//         // For common usages, see pull request #1233.
//         var serverVersion = new MySqlServerVersion(ServerVersion.AutoDetect(connectionString));
//
//         // Replace 'YourDbContext' with the name of your own DbContext derived class.
//         services.AddDbContext<UserDbContext>(
//             dbContextOptions => dbContextOptions
//                 .UseMySql(connectionString, serverVersion)
//                 // The following three options help with debugging, but should
//                 // be changed or removed for production.
//                 .LogTo(Console.WriteLine, LogLevel.Information)
//                 .EnableSensitiveDataLogging()
//                 .EnableDetailedErrors()
//         );
//     }
// }
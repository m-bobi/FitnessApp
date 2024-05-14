using backend.Enums;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.DbContext
{

    public class ApplicationDbContext : IdentityDbContext<User>
    {

        public DbSet<Class> Class { get; set; }
        public DbSet<Gym> Gym { get; set; }
        public DbSet<Manager> Manager { get; set; }
        public DbSet<Members> Members { get; set; }
        public DbSet<Offers> Offers { get; set; }
        public DbSet<Orders> Orders { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<PersonalizedWorkout> PerWorkouts { get; set; }
        public DbSet<Products> Products { get; set; }
        public DbSet<Sponsors> Sponsors { get; set; }
        public DbSet<Trainers> Trainers { get; set; }
        public DbSet<WorkoutPlans> WorkoutPlans { get; set; }
        public DbSet<Workouts> Workouts { get; set; }

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);

            // Seed AspNetUsers table with default admin user
            var hasher = new PasswordHasher<User>();

            var adminEmail =
                new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("SiteSettings")[
                    "AdminEmail"];
            var adminPassword =
                new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("SiteSettings")[
                    "AdminPassword"];

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = "80c8b6b1-e2b6-45e8-b044-8f2178a90111", // primary key
                    UserName = "admin",
                    NormalizedUserName = adminEmail.ToUpper(),
                    Address = "admin street",
                    Name = "Admin",
                    Age = 20,
                    Gender = "Male",
                    PhoneNumber = "044234234",
                    PasswordHash = hasher.HashPassword(null, adminPassword),
                    Email = adminEmail,
                    NormalizedEmail = adminEmail.ToUpper(),
                    Role = Enums.Roles.Manaxher
                }
            );
        }
    }
}
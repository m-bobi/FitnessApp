using backend.DTO;
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

        public DbSet<UserClass> UserClasses { get; set; }
        public DbSet<Contact> Contact { get; set; }
        public DbSet<TrainerClass> TrainerClasses { get; set; }

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
                    Id = "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                    UserName = "admin",
                    NormalizedUserName = adminEmail.ToUpper(),
                    Address = "admin street",
                    Name = "Admin",
                    Birthdate = new System.DateTime(1990, 1, 1),
                    Gender = "Male",
                    PhoneNumber = "044234234",
                    PasswordHash = hasher.HashPassword(null, adminPassword),
                    Email = adminEmail,
                    NormalizedEmail = adminEmail.ToUpper(),
                    Role = Enums.Roles.Manager,
                    RefreshToken = "f3e1QfQ6UYy3Qec6S0YHYCIBJr650EnapwAOeqs6FtTnCjcBePrZoXaLL7EqzXCwjX2imH01FRPKKQASPPOluCTuOhZBfmWHK5wMYkh6TchNIFsliyl3mw0ArEw9nFBjYkJKZougaMD7SziOGhq5WUbKusE2akIMJUvCiQkxEuZ3D9rMc5tYp7kwU2m4NRkgfkqqPcUPTKOMyaj3w2wkQIxwG3cT6IKTIDaL7ayx0zentz4oZclxCuKmtGvXkYSSJjWd4Edn75HIGZ1o1Kc8NjdkNLsKcddVf7wOCcKdQQHVuHFbcPzibZHMpsYmQK6T"
                }
            );

            modelBuilder.Entity<UserClass>()
                .HasKey(uc => new { uc.UserId, uc.ClassId });

            modelBuilder.Entity<UserClass>()
                .HasOne(uc => uc.User)
                .WithMany(u => u.UserClasses)
                .HasForeignKey(uc => uc.UserId);

            modelBuilder.Entity<UserClass>()
                .HasOne(uc => uc.Class)
                .WithMany(c => c.UserClasses)
                .HasForeignKey(uc => uc.ClassId);

            modelBuilder.Entity<Orders>()
                .HasOne(o => o.User)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.UserId);

            modelBuilder.Entity<Workouts>()
                .HasOne(w => w.User)
                .WithMany(u => u.Workouts)
                .HasForeignKey(w => w.UserId);


            modelBuilder.Entity<TrainerClass>()
                .HasKey(tc => new { tc.TrainerClassId });

            modelBuilder.Entity<TrainerClass>()
                .HasOne(tc => tc.Trainer)
                .WithMany(t => t.TrainerClasses)
                .HasForeignKey(tc => tc.TrainerId);

            modelBuilder.Entity<TrainerClass>()
                .HasOne(tc => tc.Class)
                .WithMany(c => c.TrainerClasses)
                .HasForeignKey(tc => tc.ClassId);
        }
    }
}
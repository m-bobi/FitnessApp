using backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.DbContext
{

    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Class> Class {get; set;}
        public DbSet<Gym> Gym { get; set; }
        public DbSet<Manager> Manager { get; set;}
        public DbSet<Members> Members { get; set; }
        public DbSet<Offers> Offers { get; set; }
        public DbSet<Orders>Orders { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<PersonalizedWorkout> PerWorkouts { get; set; }
        public DbSet<Products> Products { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<Sponsors> Sponsors { get; set; }
        public DbSet<Trainers> Trainers { get; set; }
        public DbSet<WorkoutPlans> WorkoutPlans { get; set; }
        public DbSet<Workouts> Workouts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
                base.OnModelCreating(modelBuilder);
        }
    }
}
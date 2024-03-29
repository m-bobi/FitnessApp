using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;



namespace backend.DbContext
{

    public class UserDbContext : IdentityDbContext
    {
        public UserDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Class> Class {get; set;}
        public DbSet<Gym> Gym { get; set; }
        public DbSet<Manager> Manager { get; set;}
        public DbSet<Members> Members { get; set; }
        public DbSet<Offers> Offers { get; set; }
        public DbSet<Orders>Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            {
                base.OnModelCreating(modelBuilder);
                modelBuilder.Entity<User>(entity =>
                {
                    entity.HasKey(e => e.UserId);
                    entity.Property(e => e.Name).IsRequired();
                    entity.Property(e => e.Username).IsRequired();
                    entity.Property(e => e.Email).IsRequired();
                    entity.Property(e => e.Password).IsRequired();
                    entity.Property(e => e.Mobile).IsRequired();
                    entity.Property(e => e.Age).IsRequired();
                    entity.Property(e => e.Gender).IsRequired();
                    entity.Property(e => e.Address).IsRequired();
                });
                modelBuilder.Entity<User>().ToTable("users");
            }
        }
    }
}
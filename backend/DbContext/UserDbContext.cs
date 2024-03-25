namespace backend.DbContext;
using Microsoft.EntityFrameworkCore;
using backend.Models;

public class UserDbContext : DbContext


{
    // public DataContext(DbContextOptions options) : base(options)
    // {
    // }
    
    public DbSet<User> Users { get; set; }

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
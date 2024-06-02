using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;
using backend.Enums;
using Microsoft.AspNetCore.Identity;

namespace backend.Models;

public class User : IdentityUser
{
    [Required]
    [StringLength(20, ErrorMessage = "The name should be less than 20 characters.")]
    public string? Name { get; set; }

    [StringLength(20, ErrorMessage = "The address should be less than 20 characters.")]
    public string? Address { get; set; }

    [RegularExpression(@"^\+?\d{1,3}[- ]?\d{3,14}$", ErrorMessage = "Invalid phone number format")]
    public string? PhoneNumber { get; set; }

    public string? Image { get; set; }
    public DateTime? Birthdate { get; set; }
    public string? Gender { get; set; }

    
    [Column(TypeName = "datetime")]
    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
    
    public Roles Role { get; set; }
    
    public ICollection<UserClass> UserClasses { get; set; }
    public ICollection<Orders> Orders { get; set; }
    public string RefreshToken { get; set; }
}
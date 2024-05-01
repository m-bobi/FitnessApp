using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace backend.Models;

public class User : IdentityUser
{
    [Required]
    [StringLength(20, ErrorMessage = "The name should be less than 20 characters.")]
    public string Name { get; init; }

    [StringLength(20, ErrorMessage = "The address should be less than 20 characters.")]
    public string Address { get; init; }

    [RegularExpression(@"^\d{10}$", ErrorMessage = "Invalid phone number format")]
    public string Mobile { get; init; }

    public int Age { get; init; }

    public string Gender { get; init; }

    [Column(TypeName = "datetime")]
    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
}
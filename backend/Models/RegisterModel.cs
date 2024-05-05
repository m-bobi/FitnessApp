using System.ComponentModel.DataAnnotations;
using backend.Enums;

namespace backend.Models;

public class RegisterModel
{
    [Required]
    public string? Email { get; set; }

    [Required] public string? Username { get; set; }

    [Required] [StringLength(20, ErrorMessage = "The name should be less than 20 characters.")]
    public string? Name { get; init; }

    [StringLength(20, ErrorMessage = "The address should be less than 20 characters.")]
    public string? Address { get; set; }

    [RegularExpression(@"^\+?\d{1,3}[- ]?\d{3,14}$", ErrorMessage = "Invalid phone number format")]
    public string? Mobile { get; init; }


    public int? Age { get; init; }

    
    [Required]
    public string Password { get; set; }
    
    public string? Gender { get; init; }
    public Roles Role { get; set; }
} 
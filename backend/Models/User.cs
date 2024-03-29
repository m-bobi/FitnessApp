// We use these packages to tell what metadata we use

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;


public class User
{
    [Key]
    public int UserId { get; set; }

    [Required]
    [StringLength(50)]
    public string Name { get; set; } = "";

    [Required]
    [StringLength(20)]
    // Have to make Username unique.
    public string Username { get; set; } = "";

    [Required]
    [MinLength(8)] 
    public string Password { get; set; } = "";

    [Required]
    [EmailAddress]
    public string Email { get; set; } = ""; // Have to make email unique.

    [StringLength(100)]
    public string Address { get; set; } = "";

    [RegularExpression(@"^\d{10}$", ErrorMessage = "Invalid phone number format")]
    public string Mobile { get; set; } = "";
    
    
    public int Age { get; set; }
    
    public string Gender { get; set; }

    [ForeignKey("MemberTypeId")]
    public int? MemberTypeId { get; }

    [ForeignKey("TrainerId")]
    public int? TrainerId { get; } 

    [Column(TypeName = "datetime")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

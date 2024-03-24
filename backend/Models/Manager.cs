using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

// We use these packages to tell what metadata we use

public class Manager
{
    [Key]
    public int ManagerId { get; set; }
    
    [Required]
    public string Name { get; set; }
    
    [Required]
    public string LastName { get; set; }
    
    [EmailAddress]
    [Required]
    public string Email { get; set; } // Have to make email unique.
    
    [ForeignKey("UserId")]
    public int? UserId { get; }
    
}
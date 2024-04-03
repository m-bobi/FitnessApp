using System.ComponentModel.DataAnnotations;

namespace backend.Models;

// We use these packages to tell what metadata we use
public class Permission
{
    
    [Key]
    public int? PermissionId { get; set; }
    
    [Required]
    [StringLength(60)]
    public string? PermissionDescription { get; set; }
    
}
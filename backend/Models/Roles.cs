using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class Roles
{
    [Key]
    public int? RoleId { get; set; }
    
    [Required]
    public string? RoleType { get; set; }
    
    [ForeignKey("PermissionId")]
    public int? PermissionId { get; }
}
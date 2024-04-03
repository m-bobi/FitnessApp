using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class Trainers
{
    [Key]
    public int? TrainerId { get; set; }
    
    [Required]
    public int? TrainerName { get; set; }
    
    [EmailAddress]
    [Required]
    public string TrainerEmail { get; set; }
    
    [Required]
    [StringLength(20)]
    public string TrainerAddress { get; set; }
    
    [ForeignKey("PermissionId")]
    public string? PermissionId { get; init; }
    
}
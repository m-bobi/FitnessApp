using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

// We use these packages to tell what metadata we use

public class Gym
{
    [Key]
    public int GymId { get; set; }
    
    [Required]
    public string Location { get; set; }

    [Column(TypeName = "datetime")] public DateTime OpenHours { get; set; }
    
    [Required]
    public int Capacity { get; set; }
    
    [ForeignKey("ManagerId")]
    public int? ManagerId { get; }
}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class WorkoutPlans
{
    [Key]
    public int? WorkoutPlanId { get; set; }
    
    [Column(TypeName = "datetime")]
    public DateTime WorkoutTimeDate { get; set; }
    
    [Required]
    [StringLength(20)]
    public string? WorkoutType { get; set; }
    
    [ForeignKey("MemberId")]
    public int? MemberId { get; init; }
}
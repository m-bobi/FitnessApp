using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class PersonalizedWorkout
{
    [Key]
    public int? PersonalizedId { get; set; }
    
    [Required]
    public string? PersonalizedName { get; set; }
    
    [Required]
    [StringLength(22)]
    public string? PersonalizedType { get; set; }
    
    [ForeignKey("MemberId")]
    public int? MemberId { get; }
}
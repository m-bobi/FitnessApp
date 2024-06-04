using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models;
using Newtonsoft.Json;

namespace backend.DTO;

public class WorkoutDTO
{
    [Key]
    public int? WorkoutId { get; set; }
    
    [Required]
    [StringLength(12)]
    public string? WorkoutType { get; set; }
    
    [Required]
    [StringLength(20)]
    public string? WorkoutStartTime { get; set; }
    
    [Required]
    [StringLength(20)]
    public string? WorkoutEndTime { get; set; }
    
    [ForeignKey("ClassId")]
    public int? ClassId { get; init; }
    
    
    [ForeignKey("Id")]
    public String? UserId { get; set; }
    
    [JsonIgnore]
    public User? User { get; set; }
}
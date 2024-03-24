using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

// We use these packages to tell what metadata we use

public class Class
{
    [Key]
    public int ClassId { get; set; }
    
    [Required]
    public string ClassType { get; set; }

    [Column(TypeName = "datetime")] public DateTime WorkoutDateTime { get; set; }
}
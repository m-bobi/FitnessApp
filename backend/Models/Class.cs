using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace backend.Models;

// We use these packages to tell what metadata we use

public class Class
{
    [Key]
    public int ClassId { get; set; }
    
    [Required]
    [StringLength(20)]
    public string ClassType { get; set; }

    public string ClassDescription { get; set; }

    public string ClassImage { get; set; }
    
    [Column(TypeName = "datetime")] public DateTime ClassDateTime { get; set; }
    
    [JsonIgnore]
    public ICollection<UserClass> UserClasses { get; set; }
    
    public ICollection<TrainerClass> TrainerClasses { get; set; }
    public string? TrainerId { get; set; }
}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class ClassRequest
{
    [Key]
    public int ClassId { get; set; }

    [Required]
    [StringLength(20)]
    public string ClassType { get; set; }

    public string ClassDescription { get; set; }

    public string ClassImage { get; set; }

    [Column(TypeName = "datetime")] 
    public DateTime ClassDateTime { get; set; }
}
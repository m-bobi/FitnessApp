using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

// We use these packages to tell what metadata we use

public class Members
{
    [Key]
    public int MemberId { get; set; }
    
    [Required]
    [StringLength(100)]
    public string Description { get; set; }
    
    [Column(TypeName = "datetime")]
    public DateTime JoinDate { get; set; }
    
    [ForeignKey("MTypeId")]
    public int? MTypeId { get; }
}
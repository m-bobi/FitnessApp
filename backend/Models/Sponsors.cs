using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class Sponsors
{
    [Key]
    public int? SponsorId { get; set; }
    
    [Required]
    public string? SponsorCompanyName { get; set; }
    
    [Required]
    public string? SponsorType { get; set; }
    
    [ForeignKey("ManagerId")]
    public int? ManagerId { get; }
}
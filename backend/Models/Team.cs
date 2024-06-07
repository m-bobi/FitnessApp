using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class Team
{
    [Key]
    public int? TeamId { get; set; }

    [Required]
    public string Name { get; set; }
    
    // public ICollection<Player> Players { get; set; }

}
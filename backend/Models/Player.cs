using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class Player
{
    [Key]
    public int? PlayerId { get; set; }

    public string Name { get; set; }

    public int Number { get; set; }

    public int BirthYear { get; set; }
    

    [ForeignKey("TeamId")]
    public int? TeamId { get; init; }
    
    // public Team Team { get; set; }
}
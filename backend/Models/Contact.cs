namespace backend.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Contact
{
    [Key]
    public int? ContactId { get; set; }
    
    [Required]
    public string Email { get; set; }

    public string Subject { get; set; }

    [Required]
    public string Message { get; set; }

    [ForeignKey("User")]
    public string UserId { get; set; }

}
// We use these packages to tell what metadata we use

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;



public class Payment
{
    [Key]
    public int PaymentId { get; set; }
    
    [Required]
    public float PaymentAmount { get; set; }
    
    [Column(TypeName = "datetime")]
    public DateTime PaymentDateTime { get; set; } = DateTime.UtcNow;
    
    
    [ForeignKey("UserId")]
    public int? UserId { get; }
    
    [ForeignKey("OrderId")]
    public int? OrderId { get; }
}
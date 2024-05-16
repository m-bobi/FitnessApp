using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

// We use these packages to tell what metadata we use

public class Orders
{
    [Key]
    public int OrderId { get; set; }

    [Column(TypeName = "datetime")] public DateTime OrderDate { get; set; } = DateTime.Now;
    
    public decimal OrderTotalAmount { get; set; }

    [StringLength(20)] [Required]
    public string OrderStatus { get; set; }
    
}
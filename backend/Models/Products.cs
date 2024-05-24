using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Products
{
    [Key]
    public int? ProductId { get; set; }
    
    [Required]
    public string ProductName { get; set; }
    
    [Required]
    [StringLength(30)]
    public string ProductDescription { get; set; }
    
    [Required]
    public decimal ProductPrice { get; set; } 
    
    [Required]
    [StringLength(12)]
    public string ProductCategory { get; set; }
    
    [Required]
    public string ProductImage { get; set; }
    
    [Required]
    public int ProductStock { get; set; }

    public int? ProductRate { get; set; }

    [StringLength(24)]
    public string StripeProductId { get; set; }

    [StringLength(50)]
    public string StripePriceId { get; set; }
}
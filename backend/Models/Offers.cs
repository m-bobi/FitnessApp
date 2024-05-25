using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

// We use these packages to tell what metadata we use

public class Offers
{
    [Key]
    public int OfferId { get; set; }
    
    [StringLength(100)]
    [Required]
    public string OfferType { get; set; }
    
    [Required]
    public string OfferDescription { get; set; }
    
    [Required]
    public int OfferPrice { get; set; }
    
    
    
    
   
}
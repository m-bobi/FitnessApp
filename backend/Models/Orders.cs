using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace backend.Models;
    public class Orders
    {
        [Key]
        public int OrderId { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime OrderDate { get; set; } = DateTime.Now;

        public decimal OrderTotalAmount { get; set; }

        [StringLength(20)]
        [Required]
        public string OrderStatus { get; set; }

        [ForeignKey("Id")]
        public String UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; }

        [ForeignKey("ProductId")]
        public int ProductId { get; set; }

        public Products Product { get; set; }
    }

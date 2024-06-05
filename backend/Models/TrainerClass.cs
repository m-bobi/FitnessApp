using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models; 
public class TrainerClass
    {
        [Key]
        public int TrainerClassId { get; set; }

        [Required]
        public string TrainerId { get; set; }

        [ForeignKey("TrainerId")]
        public User Trainer { get; set; }

        [Required]
        public int ClassId { get; set; }

        [ForeignKey("ClassId")]
        public Class Class { get; set; }
    }

using MyOrganizer.Models;
using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace MyOrganizer.DataModels
{
    public class Tasks
    {
        public int Id { get; set; }

        [Required]
        [Display(Name = "Task Name")]
        public string TaskName { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Task Date")]
        public DateTime TaskDate { get; set; }

        public Boolean Done { get; set; } = false;

        public string Description { get; set; }

        [JsonIgnore]
        public virtual ApplicationUser User { get; set; }
    }
}
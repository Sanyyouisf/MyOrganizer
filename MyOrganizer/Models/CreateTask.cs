using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MyOrganizer.Models
{
    public class CreateTask
    {
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

        public RepeatInterval Interval { get; set; }

        public RepeatPeriod Period { get; set; }

        public ApplicationUser User { get; set; }

    }

    public enum RepeatInterval
    {
        None,
        Daily,
        Weekly,
        Monthly,
        Yearly
    }

    public enum RepeatPeriod
    {
        None,
        Week,
        Month,
        OneYear,
        TwoYears,
        fiveYears
    }
}
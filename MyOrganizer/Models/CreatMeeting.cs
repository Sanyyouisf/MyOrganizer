using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MyOrganizer.Models
{
    public class CreatMeeting
    {
        [Required]
        [Display(Name = "Meeting Name")]
        public string MeetingName { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Meeting Date")]
        public DateTime MeetingDate { get; set; }

        public Boolean Done { get; set; } = false;

        public string Notes { get; set; }

        public MeetingRepeatInterval Interval { get; set; }

        public MeetingRepeatPeriod Period { get; set; }

        public ApplicationUser User { get; set; }

    }
    [DefaultValue(None)]
    public enum MeetingRepeatInterval
    {
        None,
        Dailey,
        weekly,
        Monthly,
    }

    [DefaultValue(None)]
    public enum MeetingRepeatPeriod
    {
        None,
        week,
        Month,
        year,
    }

}
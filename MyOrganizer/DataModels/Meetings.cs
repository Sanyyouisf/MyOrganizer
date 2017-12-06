﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MyOrganizer.DataModels
{
    public class Meetings
    {
        public int Id { get; set; }

        [Required]
        [Display(Name = "Meeting Name")]
        public string MeetingName { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Meeting Date")]
        public string MeetingDate { get; set; }

        public Boolean Done { get; set; } = false ;

        public string Notes { get; set; }

        public virtual int UserId { get; set; }
    }
}
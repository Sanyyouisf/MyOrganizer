using MyOrganizer.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace MyOrganizer.DataModels
{
    public class AddressBooks
    {
        public int Id { get; set; }

        [Required]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }

        [Required]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        [Required]
        [Display(Name = "Telephone Number")]
        public string Tel { get; set; }

        [Required]
        [Display(Name = "Email Address")]
        public string Email { get; set; }

        [Required]
        public string Street { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        public int Zipcode { get; set; }

        public RelationShip RelationShip { get; set; }

        public virtual ApplicationUser User { get; set; }
    }

    [DefaultValue(Others)]
    public enum RelationShip
    {
        Family,
        Friend,
        Others
    }
}
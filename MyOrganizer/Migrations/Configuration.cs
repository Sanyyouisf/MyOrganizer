namespace MyOrganizer.Migrations
{
    using Microsoft.AspNet.Identity.EntityFramework;
    using MyOrganizer.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<MyOrganizer.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(MyOrganizer.Models.ApplicationDbContext context)
        {
            var userManager = new ApplicationUserManager(new UserStore<ApplicationUser>(context));

            var user = new ApplicationUser
            {
                UserName = "sanyyousif",
                Email = "s@yahoo.com",
            };

            userManager.CreateAsync(user, "123456").Wait();


        }
    }
}

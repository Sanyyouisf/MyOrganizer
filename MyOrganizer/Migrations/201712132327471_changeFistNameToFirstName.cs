namespace MyOrganizer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changeFistNameToFirstName : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AddressBooks", "FirstName", c => c.String(nullable: false));
            DropColumn("dbo.AddressBooks", "FistName");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AddressBooks", "FistName", c => c.String(nullable: false));
            DropColumn("dbo.AddressBooks", "FirstName");
        }
    }
}

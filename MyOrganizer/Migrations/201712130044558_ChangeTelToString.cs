namespace MyOrganizer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeTelToString : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.AddressBooks", "Tel", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.AddressBooks", "Tel", c => c.Int(nullable: false));
        }
    }
}

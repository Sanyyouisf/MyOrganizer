namespace MyOrganizer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeUserIdToUserInTheModels : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.AddressBooks", name: "ApplicationUser_Id", newName: "User_Id");
            RenameColumn(table: "dbo.Meetings", name: "ApplicationUser_Id", newName: "User_Id");
            RenameColumn(table: "dbo.Tasks", name: "ApplicationUser_Id", newName: "User_Id");
            RenameIndex(table: "dbo.AddressBooks", name: "IX_ApplicationUser_Id", newName: "IX_User_Id");
            RenameIndex(table: "dbo.Meetings", name: "IX_ApplicationUser_Id", newName: "IX_User_Id");
            RenameIndex(table: "dbo.Tasks", name: "IX_ApplicationUser_Id", newName: "IX_User_Id");
            DropColumn("dbo.AddressBooks", "UserId");
            DropColumn("dbo.Meetings", "UserId");
            DropColumn("dbo.Tasks", "UserId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Tasks", "UserId", c => c.Int(nullable: false));
            AddColumn("dbo.Meetings", "UserId", c => c.Int(nullable: false));
            AddColumn("dbo.AddressBooks", "UserId", c => c.Int(nullable: false));
            RenameIndex(table: "dbo.Tasks", name: "IX_User_Id", newName: "IX_ApplicationUser_Id");
            RenameIndex(table: "dbo.Meetings", name: "IX_User_Id", newName: "IX_ApplicationUser_Id");
            RenameIndex(table: "dbo.AddressBooks", name: "IX_User_Id", newName: "IX_ApplicationUser_Id");
            RenameColumn(table: "dbo.Tasks", name: "User_Id", newName: "ApplicationUser_Id");
            RenameColumn(table: "dbo.Meetings", name: "User_Id", newName: "ApplicationUser_Id");
            RenameColumn(table: "dbo.AddressBooks", name: "User_Id", newName: "ApplicationUser_Id");
        }
    }
}

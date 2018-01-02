namespace MyOrganizer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MeetingDateTimeTypeChange : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Meetings", "MeetingDate", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Meetings", "MeetingDate", c => c.String(nullable: false));
        }
    }
}

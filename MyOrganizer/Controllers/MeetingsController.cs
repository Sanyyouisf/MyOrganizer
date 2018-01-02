using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using MyOrganizer.DataModels;
using MyOrganizer.Models;
using Microsoft.AspNet.Identity;

namespace MyOrganizer.Controllers
{
    public class MeetingsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
//------Get all the meeting List that are not done ---------------------------------
        // GET: api/Meetings
        public IQueryable<Meetings> GetMeetings()
        {
            return db.Meetings.Where(M=>M.Done.ToString().ToLower() == "false");
        }
//-------Get a single meeting------------------------------------------------------------------
        // GET: api/Meetings/5
        [ResponseType(typeof(Meetings))]
        public IHttpActionResult GetMeetings(int id)
        {
            Meetings meetings = db.Meetings.Find(id);
            if (meetings == null)
            {
                return NotFound();
            }

            return Ok(meetings);
        }
//------for the to do list --------------------------------------------------------------------------
        //GET:api/Meetings/ToDoList
        [HttpGet, Route("api/Meetings/toDoList")]
        [ResponseType(typeof(Meetings))]
        public IQueryable<Meetings> GetMeetingsToDoList()
        {
            return db.Meetings.Where(M => M.Done.ToString().ToLower() == "false"
                                      && M.MeetingDate.Month == DateTime.Today.Month
                                      && M.MeetingDate.Year == DateTime.Today.Year);
            //return db.Tasks.Where(c => c.Done.ToString().ToLower() == "false"
            //                      && c.TaskDate.Year == DateTime.Today.Year
            //                      && c.TaskDate.Month == DateTime.Now.AddMonths(1) )
        }
//--------to mark the meeting as Done-----------------------------------------------------------
        // PUT : api/Meetings/Done/3
        [HttpPut, Route("api/Meetings/Done/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult MarkTaskAsDone(int id, Meetings meetings)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != meetings.Id)
            {
                return BadRequest();
            }
            meetings.User = db.Users.Find(User.Identity.GetUserId());
            db.Entry(meetings).State = EntityState.Modified;

            try
            {
                if (meetings.Done == true)
                {
                    var Donemeeting = new Meetings
                    {
                        MeetingName = meetings.MeetingName,
                        MeetingDate = meetings.MeetingDate,
                        Done = false
                    };
                }
                else
                {
                    var Donemeeting = new Meetings
                    {
                        MeetingName = meetings.MeetingName,
                        MeetingDate = meetings.MeetingDate,
                        Done = true
                    };
                }

                db.SaveChanges();

            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MeetingsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }
        //--------to edit the meeting-------------------------------------------------------------------
        // PUT: api/Meetings/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTasks(int id, Meetings meetings)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != meetings.Id)
            {
                return BadRequest();
            }
            meetings.User = db.Users.Find(User.Identity.GetUserId());

            db.Entry(meetings).State = EntityState.Modified;

            try
            {
                var meeting = new Meetings
                {
                    MeetingName = meetings.MeetingName,
                    MeetingDate = meetings.MeetingDate,
                    Notes = meetings.Notes,
                    User = meetings.User,
                    Id = meetings.Id
                };
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MeetingsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        //------to add a meeting------------------------------------------
        //POST: api/Meetings/new
        [ResponseType(typeof(Meetings))]
        public IHttpActionResult CreateMeeings(CreateMeeting meeting)
        {
            //throw new NotImplementedException();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            meeting.User = db.Users.Find(User.Identity.GetUserId());
            //-incase there is no repeate.
            if (meeting.Interval == MeetingRepeatInterval.None && meeting.Period == MeetingRepeatPeriod.None)
            {
                var meetings = new Meetings
                {
                    MeetingName = meeting.MeetingName,
                    MeetingDate = meeting.MeetingDate,
                    Done = meeting.Done,
                    Notes = meeting.Notes,
                    User = meeting.User
                };
                db.Meetings.Add(meetings);
                db.SaveChanges();
                return CreatedAtRoute("DefaultApi", new { id = meetings.Id }, meetings);
            }
            //=======================================================================
            //-------incase you repeate dailey
            else if (meeting.Interval == MeetingRepeatInterval.Daily)
            {
                //-------repeate meeting dailey  for None period
                if (meeting.Period == MeetingRepeatPeriod.None)
                {
                    return BadRequest(ModelState);
                }
                //------ repeate meeting dailey for a week
                else if (meeting.Period == MeetingRepeatPeriod.Week)
                {
                    var numberOfMeetings = 7;
                    for (var i = 0; i < numberOfMeetings; i++)
                    {
                        var today = meeting.MeetingDate.AddDays(i);
                        var meetings = new Meetings { MeetingName = meeting.MeetingName, MeetingDate = today, Done = meeting.Done, Notes = meeting.Notes, User = meeting.User };
                        db.Meetings.Add(meetings);
                    }
                    db.SaveChanges();
                    return Ok();
                }
                //-------repeate meeting dailey for a month
                else if (meeting.Period == MeetingRepeatPeriod.Month)
                {
                    var numberOfMeetings = 30;
                    for (var i = 0; i < numberOfMeetings; i++)
                    {
                        var today = meeting.MeetingDate.AddDays(i);
                        var meetings = new Meetings { MeetingName = meeting.MeetingName, MeetingDate = today, Done = meeting.Done, Notes = meeting.Notes, User = meeting.User };
                        db.Meetings.Add(meetings);
                    }
                    db.SaveChanges();
                    return Ok();
                }
                //-------repeate meeting dailey for one Year
                else if (meeting.Period == MeetingRepeatPeriod.OneYear)
                {
                    var numberOfMeetings = 365;
                    for (var i = 0; i < numberOfMeetings; i++)
                    {
                        var today = meeting.MeetingDate.AddDays(i);
                        var meetings = new Meetings { MeetingName = meeting.MeetingName, MeetingDate = today, Done = meeting.Done, Notes = meeting.Notes, User = meeting.User };
                        db.Meetings.Add(meetings);
                    }
                    db.SaveChanges();
                    return Ok();
                }
                //-------repeate meeting dailey for one year
                else if (meeting.Period == MeetingRepeatPeriod.OneYear)
                {
                    var numberOfMeetings = 365;
                    for (var i = 0; i < numberOfMeetings; i++)
                    {
                        var today = meeting.MeetingDate.AddDays(i);
                        var meetings = new Meetings { MeetingName = meeting.MeetingName, MeetingDate = today, Done = meeting.Done, Notes = meeting.Notes, User = meeting.User };
                        db.Meetings.Add(meetings);
                    }
                    db.SaveChanges();
                    return Ok();
                }
            }
            //---------Done with Daily interval 
            //======================================================================================
            //incase you repeate weekly----------
            else if (meeting.Interval == MeetingRepeatInterval.Weekly)
            {
                //-------repeate meeting weekly  for None period
                if (meeting.Period == MeetingRepeatPeriod.None)
                {
                    return BadRequest(ModelState);
                }
                //-------repeate meeting weekly  for one week
                else if (meeting.Period == MeetingRepeatPeriod.Week)
                {
                    var numberOfMeetings = 1;
                    for (var i = 0; i < numberOfMeetings; i++)
                    {
                        var today = meeting.MeetingDate.AddDays(i);
                        var meetings = new Meetings { MeetingName = meeting.MeetingName, MeetingDate = today, Done = meeting.Done, Notes = meeting.Notes, User = meeting.User };
                        db.Meetings.Add(meetings);
                    }
                    db.SaveChanges();
                    return Ok();
                }
                //------ repeate task Weekly for a Month
                else if (meeting.Period == MeetingRepeatPeriod.Month)
                {
                    var numberOfMeetings = 4;
                    for (var i = 0; i < numberOfMeetings; i++)
                    {
                        var today = meeting.MeetingDate.AddDays(i);
                        var meetings = new Meetings { MeetingName = meeting.MeetingName, MeetingDate = today, Done = meeting.Done, Notes = meeting.Notes, User = meeting.User };
                        db.Meetings.Add(meetings);
                    }
                    db.SaveChanges();
                    return Ok();
                }
                //-------repeate task weekly for one year
                else if (meeting.Period == MeetingRepeatPeriod.OneYear)
                {
                    var numberOfMeetings = 52;
                    for (var i = 0; i < numberOfMeetings; i++)
                    {
                        var today = meeting.MeetingDate.AddDays(i);
                        var meetings = new Meetings { MeetingName = meeting.MeetingName, MeetingDate = today, Done = meeting.Done, Notes = meeting.Notes, User = meeting.User };
                        db.Meetings.Add(meetings);
                    }
                    db.SaveChanges();
                    return Ok();
                }
            }
            //---------Done with weekly interval 
            //==================================================================
            //incase you repeate Monthly----------
            else if (meeting.Interval == MeetingRepeatInterval.Monthly)
            {
                //-------repeate task Monthly for None period or for one week
                if (meeting.Period == MeetingRepeatPeriod.None || meeting.Period == MeetingRepeatPeriod.Week)
                {
                    return BadRequest(ModelState);
                }
                //-------repeate task Monthly for one Month
                else if (meeting.Period == MeetingRepeatPeriod.Month)
                {
                    var numberOfMeetings = 1;
                    for (var i = 0; i < numberOfMeetings; i++)
                    {
                        var today = meeting.MeetingDate.AddDays(i);
                        var meetings = new Meetings { MeetingName = meeting.MeetingName, MeetingDate = today, Done = meeting.Done, Notes = meeting.Notes, User = meeting.User };
                        db.Meetings.Add(meetings);
                    }
                    db.SaveChanges();
                    return Ok();
                }
                //-------repeate task monthly  for one year
                else if (meeting.Period == MeetingRepeatPeriod.OneYear)
                {
                    var numberOfMeetings = 12;
                    for (var i = 0; i < numberOfMeetings; i++)
                    {
                        var today = meeting.MeetingDate.AddDays(i);
                        var meetings = new Meetings { MeetingName = meeting.MeetingName, MeetingDate = today, Done = meeting.Done, Notes = meeting.Notes, User = meeting.User };
                        db.Meetings.Add(meetings);
                    }
                    db.SaveChanges();
                    return Ok();
                }
                //---------Done with monthly interval 
                //==================================================================
            }
            return Ok();
        }
//----------------------------------------------------------------------------------

        // DELETE: api/Meetings/5
        [ResponseType(typeof(Meetings))]
        public IHttpActionResult DeleteMeetings(int id)
        {
            Meetings meetings = db.Meetings.Find(id);
            if (meetings == null)
            {
                return NotFound();
            }

            db.Meetings.Remove(meetings);
            db.SaveChanges();

            return Ok(meetings);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MeetingsExists(int id)
        {
            return db.Meetings.Count(e => e.Id == id) > 0;
        }
    }
}
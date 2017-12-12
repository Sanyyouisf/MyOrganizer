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

namespace MyOrganizer.Controllers
{
    public class MeetingsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Meetings
        public IQueryable<Meetings> GetMeetings()
        {
            return db.Meetings;
        }

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

        // PUT: api/Meetings/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMeetings(int id, Meetings meetings)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != meetings.Id)
            {
                return BadRequest();
            }

            db.Entry(meetings).State = EntityState.Modified;

            try
            {
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

        // POST: api/Meetings
        [ResponseType(typeof(Meetings))]
        public IHttpActionResult PostMeetings(Meetings meetings)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Meetings.Add(meetings);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = meetings.Id }, meetings);
        }

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
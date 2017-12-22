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
    public class TasksController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

//------------------to get all the tasks list------------------------------------------------------
        // GET: api/Tasks
        public IQueryable<Tasks> GetTasks()
        {
            return db.Tasks;
        }

//-------------------to get single task card---------------------------------------------------------
        // GET: api/Tasks/5
        [ResponseType(typeof(Tasks))]
        public IHttpActionResult GetTasks(int id)
        {
            Tasks tasks = db.Tasks.Find(id);
            if (tasks == null)
            {
                return NotFound();
            }

            return Ok(tasks);
        }
//--------------------------------------------------------------------------------------------------

        // PUT: api/Tasks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTasks(int id, Tasks tasks)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tasks.Id)
            {
                return BadRequest();
            }

            db.Entry(tasks).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TasksExists(id))
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

//-------Post a task-------------------------------------------------------------------
        // POST: api/Tasks/new
        [ResponseType(typeof(Tasks))]
        public IHttpActionResult PostTasks(CreateTask task)
        {
            //throw new NotImplementedException();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            task.User = db.Users.Find(User.Identity.GetUserId());
            //incase there is no repeate.
            if (task.Interval == RepeatInterval.None)
            {
                var tasks = new Tasks
                {
                    TaskName = task.TaskName,
                    TaskDate = task.TaskDate,
                    Done = task.Done,
                    Description = task.Description,
                    User = task.User
                };
                db.Tasks.Add(tasks);
                db.SaveChanges();
                return CreatedAtRoute("DefaultApi", new { id = tasks.Id }, tasks);
            }

            //incase you repeate daily----------
            if (task.Interval == RepeatInterval.Daily)
            {
                //var numberOfTasks = ;
                //for a week
                if (task.Period == RepeatPeriod.Week)
                {
                    var numberOfTasks = 7;
                     for ( var i=0; i< numberOfTasks; i++)
                          {
                            var today = task.TaskDate.AddDays(i);
                            var tasks = new Tasks
                                {
                                    TaskName = task.TaskName,
                                    TaskDate = today,
                                    Done = task.Done,
                                    Description = task.Description,
                                    User = task.User

                            };
                            db.Tasks.Add(tasks);
                         }
                    
                    db.SaveChanges();
                    return Ok();
                }
                //else if (task.Period == RepeatPeriod.Week)
                //{

                //}
           
            }


            return Ok();

        }
        //----------------------------------------------------------------------------------------------

        // DELETE: api/Tasks/5
        [ResponseType(typeof(Tasks))]
        public IHttpActionResult DeleteTasks(int id)
        {
            Tasks tasks = db.Tasks.Find(id);
            if (tasks == null)
            {
                return NotFound();
            }

            db.Tasks.Remove(tasks);
            db.SaveChanges();

            return Ok(tasks);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TasksExists(int id)
        {
            return db.Tasks.Count(e => e.Id == id) > 0;
        }
    }
}
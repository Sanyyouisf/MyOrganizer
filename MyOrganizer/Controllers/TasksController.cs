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
using System.Web.Http.Results;

namespace MyOrganizer.Controllers
{
    public class TasksController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        //------------------to get all the tasks list------------------------------------------------------
        // GET: api/Tasks
        //public IQueryable<Tasks> GetTasks()
        //{
        //    return db.Tasks;
        //}
//-----------------to get the task list still not done----------------------------------------------

        // GET: api/Tasks
        public IQueryable<Tasks> GetTasks()
        {

            return db.Tasks.Where(c => c.Done.ToString().ToLower() == "false");
        }

//--------------------------------------------------------------------------------
    //GET:api/Tasks/ToDoList
    [HttpGet,Route("api/Tasks/toDoList")]
    [ResponseType (typeof(Tasks))]
    public IQueryable<Tasks> GetTasksToDoList ()
        {
            return db.Tasks.Where(c => c.Done.ToString().ToLower() == "false"
                                      && c.TaskDate.Month == DateTime.Today.Month
                                      && c.TaskDate.Year == DateTime.Today.Year);
            //return db.Tasks.Where(c => c.Done.ToString().ToLower() == "false"
            //                      && c.TaskDate.Year == DateTime.Today.Year
            //                      && c.TaskDate.Month == DateTime.Now.AddMonths(1) )
        }

//-------to get single task card---------------------------------------------------------
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

//-------to mark the task as Done-----------------------------------------
        // PUT : api/Tasks/Done/3
        [HttpPut,Route("api/Tasks/Done/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult MarkTaskAsDone (int id,Tasks tasks)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if(id !=tasks.Id)
            {
                return BadRequest();
            }
            tasks.User = db.Users.Find(User.Identity.GetUserId());
            db.Entry(tasks).State = EntityState.Modified;

            try
            {
                if (tasks.Done == true)
                {
                    var Donetask = new Tasks
                    {
                        TaskName = tasks.TaskName,
                        TaskDate = tasks.TaskDate,
                        Done = false
                    };
                }
                else
                {
                    var Donetask = new Tasks
                    {
                        TaskName = tasks.TaskName,
                        TaskDate = tasks.TaskDate,
                        Done = true
                    };
                }

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
//------to adit a task ------------------------------------------------------------------------------
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
            tasks.User = db.Users.Find(User.Identity.GetUserId());

            db.Entry(tasks).State = EntityState.Modified;

            try
            {
                var task = new Tasks
                {
                    TaskName = tasks.TaskName,
                    TaskDate = tasks.TaskDate,
                    Description = tasks.Description,
                    User = tasks.User,
                    Id = tasks.Id
                };
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
//-------Post a task--------------------------------------------------------------------------------
    // POST: api/Tasks/new
    [ResponseType(typeof(Tasks))]
    public IHttpActionResult CreateTasks(CreateTask task)
    {
     //throw new NotImplementedException();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            task.User = db.Users.Find(User.Identity.GetUserId());
            //-incase there is no repeate.
            if (task.Interval == RepeatInterval.None && task.Period == RepeatPeriod.None)
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
            //=======================================================================
            //-------incase you repeate dailey
            else if (task.Interval == RepeatInterval.Daily)
            {
                //-------repeate task dailey  for None period
                if (task.Period == RepeatPeriod.None)
                {
                    return BadRequest(ModelState);
                }
                //------ repeate task dailey for a week
                else if (task.Period == RepeatPeriod.Week)
                {
                    var numberOfTasks = 7;
                    for (var i = 0; i < numberOfTasks; i++)
                    {
                        var today = task.TaskDate.AddDays(i);
                        var tasks = new Tasks { TaskName = task.TaskName, TaskDate = today, Done = task.Done, Description = task.Description, User = task.User };
                        db.Tasks.Add(tasks);
                    }
                    db.SaveChanges();
                    return Ok();
                }
                //-------repeate task dailey for a month
                else if (task.Period == RepeatPeriod.Month)
                {
                    var numberOfTasks = 30;
                    for (var i = 0; i < numberOfTasks; i++)
                    {
                        var today = task.TaskDate.AddDays(i);
                        var tasks = new Tasks { TaskName = task.TaskName, TaskDate = today, Done = task.Done, Description = task.Description, User = task.User };
                        db.Tasks.Add(tasks);
                    }
                    db.SaveChanges();
                    return Ok();
                }
                //-------repeate task dailey for 6 monthes
                else if (task.Period == RepeatPeriod.sixMonthes)
                {
                    var numberOfTasks = 180;
                    for (var i = 0; i < numberOfTasks; i++)
                    {
                        var today = task.TaskDate.AddDays(i);
                        var tasks = new Tasks { TaskName = task.TaskName, TaskDate = today, Done = task.Done, Description = task.Description, User = task.User };
                        db.Tasks.Add(tasks);
                    }
                    db.SaveChanges();
                    return Ok();
                }
                //-------repeate task dailey for one year
                else if (task.Period == RepeatPeriod.OneYear)
                {
                    var numberOfTasks = 365;
                    for (var i = 0; i < numberOfTasks; i++)
                    {
                        var today = task.TaskDate.AddDays(i);
                        var tasks = new Tasks { TaskName = task.TaskName, TaskDate = today, Done = task.Done, Description = task.Description, User = task.User };
                        db.Tasks.Add(tasks);
                    }
                    db.SaveChanges();
                    return Ok();
                }
            }
            //---------Done with Daily interval 
            //======================================================================================
            //incase you repeate weekly----------
            else if (task.Interval == RepeatInterval.Weekly)
            {
                //-------repeate task weekly  for None period
                if (task.Period == RepeatPeriod.None)
                    {
                        return BadRequest(ModelState);
                    }
                //-------repeate task weekly  for one week
                else if (task.Period == RepeatPeriod.Week)
                {
                    var numberOfTasks = 1;
                    for (var i = 0; i < numberOfTasks; i++)
                    {
                        var today = task.TaskDate.AddDays(i);
                        var tasks = new Tasks { TaskName = task.TaskName, TaskDate = today, Done = task.Done, Description = task.Description, User = task.User };
                        db.Tasks.Add(tasks);
                    }
                    db.SaveChanges();
                    return Ok();
                }
                //------ repeate task Weekly for a Month
                else if (task.Period == RepeatPeriod.Month)
                {
                    var numberOfTasks = 4;
                    for (var i = 0; i < numberOfTasks; i++)
                    {
                        var today = task.TaskDate.AddDays(i);
                        var tasks = new Tasks { TaskName = task.TaskName, TaskDate = today, Done = task.Done, Description = task.Description, User = task.User };
                        db.Tasks.Add(tasks);
                    }
                    db.SaveChanges();
                    return Ok();
                }
                //-------repeate task weekly for 6 monthes
                else if (task.Period == RepeatPeriod.sixMonthes)
                {
                    var numberOfTasks = 24;
                    for (var i = 0; i < numberOfTasks; i++)
                    {
                        var today = task.TaskDate.AddDays(i);
                        var tasks = new Tasks { TaskName = task.TaskName, TaskDate = today, Done = task.Done, Description = task.Description, User = task.User };
                        db.Tasks.Add(tasks);
                    }
                    db.SaveChanges();
                    return Ok();
                }
                //-------repeate task weekly for one year
                else if (task.Period == RepeatPeriod.OneYear)
                {
                    var numberOfTasks = 52;
                    for (var i = 0; i < numberOfTasks; i++)
                    {
                        var today = task.TaskDate.AddDays(i);
                        var tasks = new Tasks { TaskName = task.TaskName, TaskDate = today, Done = task.Done, Description = task.Description, User = task.User };
                        db.Tasks.Add(tasks);
                    }
                    db.SaveChanges();
                    return Ok();
                }
            }
            //---------Done with weekly interval 
            //==================================================================
            //incase you repeate Monthly----------
            else if (task.Interval == RepeatInterval.Monthly)
            {
                //-------repeate task Monthly for None period or for one week
                if (task.Period == RepeatPeriod.None || task.Period == RepeatPeriod.Week)
                {
                    return BadRequest(ModelState);
                }
                //-------repeate task Monthly for one Month
                else if (task.Period == RepeatPeriod.Month)
                {
                    var numberOfTasks = 1;
                    for (var i = 0; i < numberOfTasks; i++)
                    {
                        var today = task.TaskDate.AddDays(i);
                        var tasks = new Tasks { TaskName = task.TaskName, TaskDate = today, Done = task.Done, Description = task.Description, User = task.User };
                        db.Tasks.Add(tasks);
                    }
                    db.SaveChanges();
                    return Ok();
                }
                //-------repeate task monthly  for six Monthes
                else if (task.Period == RepeatPeriod.sixMonthes)
                {
                    var numberOfTasks = 6;
                    for (var i = 0; i < numberOfTasks; i++)
                    {
                        var today = task.TaskDate.AddDays(i);
                        var tasks = new Tasks { TaskName = task.TaskName, TaskDate = today, Done = task.Done, Description = task.Description, User = task.User };
                        db.Tasks.Add(tasks);
                    }
                    db.SaveChanges();
                    return Ok();
                }
                //-------repeate task monthly  for one year
                else if (task.Period == RepeatPeriod.OneYear)
                {
                    var numberOfTasks = 12;
                    for (var i = 0; i < numberOfTasks; i++)
                    {
                        var today = task.TaskDate.AddDays(i);
                        var tasks = new Tasks { TaskName = task.TaskName, TaskDate = today, Done = task.Done, Description = task.Description, User = task.User };
                        db.Tasks.Add(tasks);
                    }
                    db.SaveChanges();
                    return Ok();
                }
            //---------Done with monthly interval 
            //==================================================================
            }
            return Ok();
    }         
//------------------------to delete a tesk----------------------------------------------------------------------
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
//--------------------------------------------------------------------------------------------------------------
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
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
    [Authorize]
    public class AddressBooksController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/AddressBooks
        public IQueryable<AddressBooks> GetAddressBooks()
        {
            string userId = User.Identity.GetUserId();
            return db.AddressBooks.Where(a => a.User.Id == userId);
        }

        // GET: api/AddressBooks/5
        [ResponseType(typeof(AddressBooks))]
        public IHttpActionResult GetAddressBooks(int id)
        {
            AddressBooks addressBooks = db.AddressBooks.Find(id);
            if (addressBooks == null)
            {
                return NotFound();
            }

            if (addressBooks.User.Id != User.Identity.GetUserId())
            {
                return Unauthorized();
            }

            return Ok(addressBooks);
        }

        // PUT: api/AddressBooks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAddressBooks(int id, AddressBooks addressBooks)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != addressBooks.Id)
            {
                return BadRequest();
            }

            db.Entry(addressBooks).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AddressBooksExists(id))
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

        // POST: api/AddressBooks/new
        [ResponseType(typeof(AddressBooks))]
        public IHttpActionResult PostAddressBooks(AddressBooks addressBooks)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            addressBooks.User = db.Users.Find(User.Identity.GetUserId());

            db.AddressBooks.Add(addressBooks);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = addressBooks.Id }, addressBooks);
        }

        // DELETE: api/AddressBooks/5
        [ResponseType(typeof(AddressBooks))]
        public IHttpActionResult DeleteAddressBooks(int id)
        {
            AddressBooks addressBooks = db.AddressBooks.Find(id);
            if (addressBooks == null)
            {
                return NotFound();
            }

            db.AddressBooks.Remove(addressBooks);
            db.SaveChanges();

            return Ok(addressBooks);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AddressBooksExists(int id)
        {
            return db.AddressBooks.Count(e => e.Id == id) > 0;
        }
    }
}
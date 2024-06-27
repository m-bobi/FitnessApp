using backend.DbContext;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class TrainerService
    {
        private readonly ApplicationDbContext _context;

        public TrainerService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AssignTrainerToClass(string trainerId, int classId)
        {
            var trainerClass = new TrainerClass
            {
                TrainerId = trainerId,
                ClassId = classId
            };

            _context.TrainerClasses.Add(trainerClass);
            await _context.SaveChangesAsync();
        }
    }
}
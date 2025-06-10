using GenLearn.DAL.Api;
using GenLearn.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace GenLearn.DAL.Services;

public class UserService_DAL : IUserService_DAL
{
    private readonly DB_Manager _context;

    public UserService_DAL(DB_Manager context)
    {
        _context = context;
    }

    public async Task<IEnumerable<User>> GetAllUsers()
    {
        return await _context.Users
            .Include(u => u.Prompts) // אם את רוצה גם לכלול את ההיסטוריה
            .ToListAsync();
    }

    public async Task<User?> GetUserById(int id)
    {
        return await _context.Users
            .Include(u => u.Prompts)
            .FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task<User> AddUser(User user)
    {
        user.Id = 0;
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<User?> UpdateUser(User user)
    {
        var existingUser = await _context.Users.FindAsync(user.Id);
        if (existingUser == null)
            return null;

        existingUser.Name = user.Name;
        existingUser.Phone = user.Phone;

        await _context.SaveChangesAsync();
        return existingUser;
    }

    public async Task<bool> DeleteUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
            return false;

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return true;
    }
}

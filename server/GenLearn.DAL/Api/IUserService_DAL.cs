using GenLearn.DAL.Models;

namespace GenLearn.DAL.Api
{
    public interface IUserService_DAL
    {
        Task<User?> UpdateUser(User user);
        Task<User> AddUser(User user);
        Task<bool> DeleteUser(int id);
        Task<IEnumerable<User>> GetAllUsers();
        Task<User?> GetById(int id);
        Task<User?> GetUser(string name, string phone);
    }
}
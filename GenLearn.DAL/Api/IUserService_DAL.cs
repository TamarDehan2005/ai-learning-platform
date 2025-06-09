using GenLearn.DAL.Models;

namespace GenLearn.DAL.Api
{
    public interface IUserService_DAL
    {
        Task<User> AddUser(User user);
        Task<bool> DeleteUser(int id);
        Task<IEnumerable<User>> GetAllUsers();
        Task<User?> GetUserById(int id);
        Task<User?> UpdateUser(User user);
    }
}
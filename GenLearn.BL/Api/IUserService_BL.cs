using GenLearn.BL.Models;
using GenLearn.DAL.Models;

namespace GenLearn.BL.Api
{
    public interface IUserService_BL
    {
        Task<bool> DeleteUser(int userId);
        Task<IEnumerable<PromptDTO>> GetAllPrompts();
        Task<IEnumerable<UserDTO>> GetAllUsers();
        Task<User?> GetUserById(int id);
        Task<UserDTO> GetUserDetails(string name, string phone);
        Task<IEnumerable<PromptDTO>> GetUserHistory(int userId);
        Task<UserDTO> RegisterUser(string name, string phone);
        Task<User?> UpdateUser(User user);
        Task<UserDTO> CreateUser(UserDTO newUser);
    }
}
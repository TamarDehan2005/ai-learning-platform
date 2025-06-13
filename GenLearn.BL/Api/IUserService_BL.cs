using GenLearn.BL.Models;
using GenLearn.DAL.Models;

namespace GenLearn.BL.Api
{
    public interface IUserService_BL
    {
        Task<User?> UpdateUser(User user);
        Task<User?> GetUserById(int id);
        Task<bool> DeleteUser(int userId);
        Task<IEnumerable<PromptDTO>> GetAllPrompts();
        Task<IEnumerable<UserDTO>> GetAllUsers();
        Task<IEnumerable<PromptDTO>> GetUserHistory(int userId);
        Task<UserDTO> RegisterUser(string name, string phone);
     //   Task<string> SubmitPrompt(int userId, string categoryName, string subCategoryName, string promptText);
        Task<UserDTO> GetUserDetails(string username,string userphone);
    }
}
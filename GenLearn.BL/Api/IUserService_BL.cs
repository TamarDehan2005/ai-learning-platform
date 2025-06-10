using GenLearn.BL.Models;

namespace GenLearn.BL.Api
{
    public interface IUserService_BL
    {
        Task<bool> DeleteUser(int userId);
        Task<IEnumerable<PromptDTO>> GetAllPrompts();
        Task<IEnumerable<UserDTO>> GetAllUsers();
        Task<IEnumerable<PromptDTO>> GetUserHistoryAsync(int userId);
        Task<UserDTO> RegisterUserAsync(string name, string phone);
        Task<string> SubmitPromptAsync(int userId, string categoryName, string subCategoryName, string promptText);
    }
}
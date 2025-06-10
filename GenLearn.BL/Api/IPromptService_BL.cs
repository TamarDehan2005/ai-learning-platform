using GenLearn.BL.Models;

namespace GenLearn.BL.Api
{
    public interface IPromptService_BL
    {
        Task<string> AttachResponseAsync(int promptId, string aiResponse);
        Task<PromptDTO> CreatePromptAsync(int userId, string categoryName, string subCategoryName, string promptText);
        Task<IEnumerable<PromptDTO>> GetAllUserPromptsAsync(int userId);
        Task<string> HandleUserPromptAsync(int userId, string categoryName, string subCategoryName, string promptText);
    }
}
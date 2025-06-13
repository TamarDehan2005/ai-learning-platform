using GenLearn.BL.Models;

namespace GenLearn.BL.Api
{
    public interface IPromptService_BL
    {
        Task<string> AttachResponse(int promptId, string aiResponse);
        Task<PromptDTO> CreatePrompt(int userId, string categoryName, string subCategoryName, string promptText);
        Task<IEnumerable<PromptDTO>> GetAllUserPrompts(int userId);
        Task<string> HandleUserPrompt(int userId, string categoryName, string subCategoryName, string promptText);
    }
}
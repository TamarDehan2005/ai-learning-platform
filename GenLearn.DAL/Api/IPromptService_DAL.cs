using GenLearn.DAL.Models;

namespace GenLearn.DAL.Api
{
    public interface IPromptService_DAL
    {
        Task<Prompt> AddPrompt(Prompt prompt);
        Task<bool> DeletePrompt(int id);
        Task<IEnumerable<Prompt>> GetAllPrompts();
        Task<Prompt?> GetPromptById(int id);
        Task<Prompt?> UpdatePrompt(Prompt prompt);
        Task<Category?> GetCategoryByNameAsync(string name);
    
        Task<SubCategory?> GetSubCategoryByNameAsync(string name, int categoryId);
    }
}
using GenLearn.DAL.Models;

namespace GenLearn.DAL.Api
{
    public interface ICategoryService_DAL
    {
        Task<Category> AddCategory(Category category);
        Task<bool> DeleteCategory(int id);
        Task<IEnumerable<Category>> GetAllCategories();
        Task<Category?> GetCategoryById(int id);
        Task<Category?> UpdateCategory(Category category);
    }
}
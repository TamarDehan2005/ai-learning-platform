using GenLearn.BL.Models;

namespace GenLearn.BL.Api
{
    public interface ICategoryService_BL
    {
        Task<CategoryDTO?> AddCategory(CategoryDTO categoryDto);
        Task<bool> DeleteCategory(int id);
        Task<IEnumerable<CategoryDTO>> GetAllCategories();
        Task<CategoryDTO?> GetCategoryById(int id);
        Task<CategoryDTO?> UpdateCategory(CategoryDTO categoryDto);
    }
}
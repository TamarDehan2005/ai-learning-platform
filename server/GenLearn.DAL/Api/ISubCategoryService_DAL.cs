using GenLearn.DAL.Models;

namespace GenLearn.DAL.Api
{
    public interface ISubCategoryService_DAL
    {
        Task<SubCategory> AddSubCategory(SubCategory subCategory);
        Task<bool> DeleteSubCategory(int id);
        Task<IEnumerable<SubCategory>> GetAllSubCategories();
        Task<SubCategory?> GetSubCategoryById(int id);
        Task<SubCategory?> UpdateSubCategory(SubCategory subCategory);
    }
}
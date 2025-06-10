using GenLearn.BL.Models;

namespace GenLearn.BL.Api
{
    public interface ISubCategoryService_BL
    {
        Task<SubCategoryDTO> AddSubCategory(SubCategoryDTO dto);
        Task<bool> DeleteSubCategory(int id);
        Task<IEnumerable<SubCategoryDTO>> GetAllSubCategories();
        Task<SubCategoryDTO?> GetSubCategoryById(int id);
        Task<SubCategoryDTO?> UpdateSubCategory(SubCategoryDTO dto);
    }
}
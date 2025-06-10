using AutoMapper;
using GenLearn.BL.Api;
using GenLearn.BL.Models;
using GenLearn.DAL.Api;
using GenLearn.DAL.Models;

namespace GenLearn.BL.Services;

public class CategoryService_BL : ICategoryService_BL
{
    private readonly ICategoryService_DAL _dal;
    private readonly IMapper _mapper;

    public CategoryService_BL(ICategoryService_DAL dal, IMapper mapper)
    {
        _dal = dal;
        _mapper = mapper;
    }

    public async Task<IEnumerable<CategoryDTO>> GetAllCategories()
    {
        var categories = await _dal.GetAllCategories();
        return _mapper.Map<IEnumerable<CategoryDTO>>(categories);
    }

    public async Task<CategoryDTO?> GetCategoryById(int id)
    {
        var category = await _dal.GetCategoryById(id);
        return category == null ? null : _mapper.Map<CategoryDTO>(category);
    }

    public async Task<CategoryDTO?> AddCategory(CategoryDTO categoryDto)
    {
        var allCategories = await _dal.GetAllCategories();
        if (allCategories.Any(c => c.Name.Trim().ToLower() == categoryDto.Name.Trim().ToLower()))
        {
            return null; // שם קטגוריה כבר קיים
        }

        var category = _mapper.Map<Category>(categoryDto);
        var added = await _dal.AddCategory(category);
        return _mapper.Map<CategoryDTO>(added);
    }

    public async Task<CategoryDTO?> UpdateCategory(CategoryDTO categoryDto)
    {
        var existing = await _dal.GetCategoryById(categoryDto.Id);
        if (existing == null)
            return null;

        existing.Name = categoryDto.Name;

        var updated = await _dal.UpdateCategory(existing);
        return _mapper.Map<CategoryDTO>(updated);
    }

    public async Task<bool> DeleteCategory(int id)
    {
        var category = await _dal.GetCategoryById(id);
        if (category == null)
            return false;

        if (category.SubCategories != null && category.SubCategories.Any())
            return false;

        return await _dal.DeleteCategory(id);
    }
}

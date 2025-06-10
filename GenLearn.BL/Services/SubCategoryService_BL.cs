using AutoMapper;
using GenLearn.BL.Api;
using GenLearn.BL.Models;
using GenLearn.DAL.Api;
using GenLearn.DAL.Models;


namespace GenLearn.BL.Services;

public class SubCategoryService_BL : ISubCategoryService_BL
{
    private readonly ISubCategoryService_DAL _dal;
    private readonly IMapper _mapper;

    public SubCategoryService_BL(ISubCategoryService_DAL dal, IMapper mapper)
    {
        _dal = dal;
        _mapper = mapper;
    }

    public async Task<IEnumerable<SubCategoryDTO>> GetAllSubCategories()
    {
        var subCategories = await _dal.GetAllSubCategories();
        return _mapper.Map<IEnumerable<SubCategoryDTO>>(subCategories);
    }

    public async Task<SubCategoryDTO?> GetSubCategoryById(int id)
    {
        var subCategory = await _dal.GetSubCategoryById(id);
        return _mapper.Map<SubCategoryDTO?>(subCategory);
    }

    public async Task<SubCategoryDTO> AddSubCategory(SubCategoryDTO dto)
    {
        var subCategory = _mapper.Map<SubCategory>(dto);
        var result = await _dal.AddSubCategory(subCategory);
        return _mapper.Map<SubCategoryDTO>(result);
    }

    public async Task<SubCategoryDTO?> UpdateSubCategory(SubCategoryDTO dto)
    {
        var subCategory = _mapper.Map<SubCategory>(dto);
        var updated = await _dal.UpdateSubCategory(subCategory);
        return _mapper.Map<SubCategoryDTO?>(updated);
    }

    public async Task<bool> DeleteSubCategory(int id)
    {
        return await _dal.DeleteSubCategory(id);
    }
}

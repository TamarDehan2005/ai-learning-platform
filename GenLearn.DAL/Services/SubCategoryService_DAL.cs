using GenLearn.DAL.Api;
using GenLearn.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace GenLearn.DAL.Services;

public class SubCategoryService_DAL : ISubCategoryService_DAL
{
    private readonly DB_Manager _context;

    public SubCategoryService_DAL(DB_Manager context)
    {
        _context = context;
    }

    public async Task<IEnumerable<SubCategory>> GetAllSubCategories()
    {
        return await _context.SubCategories
            .Include(sc => sc.Category)
            .Include(sc => sc.Prompts)  
            .ToListAsync();
    }

    public async Task<SubCategory?> GetSubCategoryById(int id)
    {
        return await _context.SubCategories
            .Include(sc => sc.Category)
            .Include(sc => sc.Prompts)
            .FirstOrDefaultAsync(sc => sc.Id == id);
    }

    public async Task<SubCategory> AddSubCategory(SubCategory subCategory)
    {
        _context.SubCategories.Add(subCategory);
        await _context.SaveChangesAsync();
        return subCategory;
    }

    public async Task<SubCategory?> UpdateSubCategory(SubCategory subCategory)
    {
        var existing = await _context.SubCategories.FindAsync(subCategory.Id);
        if (existing == null)
            return null;

        existing.Name = subCategory.Name;
        existing.CategoryId = subCategory.CategoryId;

        await _context.SaveChangesAsync();
        return existing;
    }

    public async Task<bool> DeleteSubCategory(int id)
    {
        var subCategory = await _context.SubCategories.FindAsync(id);
        if (subCategory == null)
            return false;

        _context.SubCategories.Remove(subCategory);
        await _context.SaveChangesAsync();
        return true;
    }
}

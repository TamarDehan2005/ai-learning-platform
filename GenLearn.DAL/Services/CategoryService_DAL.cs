using GenLearn.DAL.Api;
using GenLearn.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace GenLearn.DAL.Services;

public class CategoryService_DAL : ICategoryService_DAL
{
    private readonly DB_Manager _context;

    public CategoryService_DAL(DB_Manager context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Category>> GetAllCategories()
    {
        return await _context.Categories
            .Include(c => c.SubCategories)  // אם את רוצה גם את תתי-הקטגוריות
            .Include(c => c.Prompts)        // אם רלוונטי להציג את ההיסטוריה לפי קטגוריה
            .ToListAsync();
    }

    public async Task<Category?> GetCategoryById(int id)
    {
        return await _context.Categories
            .Include(c => c.SubCategories)
            .Include(c => c.Prompts)
            .FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<Category> AddCategory(Category category)
    {
        _context.Categories.Add(category);
        await _context.SaveChangesAsync();
        return category;
    }

    public async Task<Category?> UpdateCategory(Category category)
    {
        var existing = await _context.Categories.FindAsync(category.Id);
        if (existing == null)
            return null;

        existing.Name = category.Name;
        await _context.SaveChangesAsync();
        return existing;
    }

    public async Task<bool> DeleteCategory(int id)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category == null)
            return false;

        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();
        return true;
    }
}

using GenLearn.DAL.Api;
using GenLearn.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace GenLearn.DAL.Services;

public class PromptService_DAL : IPromptService_DAL
{
    private readonly DB_Manager _context;

    public PromptService_DAL(DB_Manager context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Prompt>> GetAllPrompts()
    {
        return await _context.Prompts
            .Include(p => p.User)
            .Include(p => p.Category)
            .Include(p => p.SubCategory)
            .ToListAsync();
    }

    public async Task<Prompt?> GetPromptById(int id)
    {
        return await _context.Prompts
            .Include(p => p.User)
            .Include(p => p.Category)
            .Include(p => p.SubCategory)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<Prompt> AddPrompt(Prompt prompt)
    {
        prompt.CreatedAt = DateTime.UtcNow;
        _context.Prompts.Add(prompt);
        await _context.SaveChangesAsync();
        return prompt;
    }

    public async Task<Prompt?> UpdatePrompt(Prompt prompt)
    {
        var existing = await _context.Prompts.FindAsync(prompt.Id);
        if (existing == null)
            return null;

        existing.UserId = prompt.UserId;
        existing.CategoryId = prompt.CategoryId;
        existing.SubCategoryId = prompt.SubCategoryId;
        existing.Prompt1 = prompt.Prompt1;
        existing.Response = prompt.Response;

        await _context.SaveChangesAsync();
        return existing;
    }

    public async Task<bool> DeletePrompt(int id)
    {
        var prompt = await _context.Prompts.FindAsync(id);
        if (prompt == null)
            return false;

        _context.Prompts.Remove(prompt);
        await _context.SaveChangesAsync();
        return true;
    }
}

using AutoMapper;
using GenLearn.BL.Api;
using GenLearn.BL.Models;
using GenLearn.DAL.Api;
using GenLearn.DAL.Models;

namespace GenLearn.BL.Services
{
    public class PromptService_BL : IPromptService_BL
    {
        private readonly IPromptService_DAL _promptDal;
        private readonly IUserService_DAL _userDal;
        private readonly IOpenAIService _aiService;
        private readonly IMapper _mapper;

        public PromptService_BL(IPromptService_DAL promptDal, IUserService_DAL userDal, IOpenAIService aiService, IMapper mapper)
        {
            _promptDal = promptDal;
            _userDal = userDal;
            _aiService = aiService;
            _mapper = mapper;
        }


        public async Task<PromptDTO> CreatePromptAsync(int userId, string categoryName, string subCategoryName, string promptText)
        {
            var category = await _promptDal.GetCategoryByNameAsync(categoryName);
            if (category == null)
                throw new Exception($"Category '{categoryName}' not found.");

            var subCategory = await _promptDal.GetSubCategoryByNameAsync(subCategoryName, category.Id);
            if (subCategory == null)
                throw new Exception($"SubCategory '{subCategoryName}' not found under category '{categoryName}'.");

            var prompt = new Prompt
            {
                UserId = userId,
                CategoryId = category.Id,
                SubCategoryId = subCategory.Id,
                Prompt1 = promptText,
                CreatedAt = DateTime.UtcNow
            };

            var savedPrompt = await _promptDal.AddPrompt(prompt);
            return _mapper.Map<PromptDTO>(savedPrompt);
        }


        public async Task<string> AttachResponseAsync(int promptId, string aiResponse)
        {
            var existingPrompt = await _promptDal.GetPromptById(promptId);
            if (existingPrompt == null)
                throw new Exception("Prompt not found");

            existingPrompt.Response = aiResponse;
            await _promptDal.UpdatePrompt(existingPrompt);

            return aiResponse;
        }

        public async Task<string> HandleUserPromptAsync(int userId, string categoryName, string subCategoryName, string promptText)
        {
            // שלב 1: שמירת ההנחיה לפי שמות
            var prompt = await CreatePromptAsync(userId, categoryName, subCategoryName, promptText);

            // שלב 2: שליחת הטקסט ל-AI
            var response = await _aiService.GetCompletionAsync(promptText);

            // שלב 3: שמירת התשובה
            await AttachResponseAsync(prompt.Id, response);

            return response;
        }

        public async Task<IEnumerable<PromptDTO>> GetAllUserPromptsAsync(int userId)
        {
            var user = await _userDal.GetUserById(userId);
            if (user == null)
                return Enumerable.Empty<PromptDTO>();

            return user.Prompts.Select(_mapper.Map<PromptDTO>);
        }
    }
}

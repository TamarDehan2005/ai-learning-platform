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


        public async Task<PromptDTO> CreatePrompt(int userId, string categoryName, string subCategoryName, string promptText)
        {
            var category = await _promptDal.GetCategoryByName(categoryName);
            if (category == null)
                throw new Exception($"Category '{categoryName}' not found.");

            var subCategory = await _promptDal.GetSubCategoryByName(subCategoryName, category.Id);
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

        /// Attaches an AI-generated response to an existing prompt
        public async Task<string> AttachResponse(int promptId, string aiResponse)
        {
            var existingPrompt = await _promptDal.GetPromptById(promptId);
            if (existingPrompt == null)
                throw new Exception("Prompt not found");

            existingPrompt.Response = aiResponse;
            await _promptDal.UpdatePrompt(existingPrompt);

            return aiResponse;
        }

        /// Creates a prompt, sends it to OpenAI, saves the response, and returns it
        public async Task<string> HandleUserPrompt(int userId, string categoryName, string subCategoryName, string promptText)
        {
            
            var prompt = await CreatePrompt(userId, categoryName, subCategoryName, promptText);

            var response = await _aiService.GetCompletionAsync(promptText);

            await AttachResponse(prompt.Id, response);

            return response;
        }

        public async Task<IEnumerable<PromptDTO>> GetAllUserPrompts(int userId)
        {
            var user = await _userDal.GetById(userId);
            if (user == null)
                return Enumerable.Empty<PromptDTO>();

            return user.Prompts.Select(_mapper.Map<PromptDTO>);
        }
    }
}

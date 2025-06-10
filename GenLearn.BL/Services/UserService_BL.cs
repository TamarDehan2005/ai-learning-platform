using GenLearn.BL.Api;
using GenLearn.DAL.Api;
using GenLearn.DAL.Models;
using GenLearn.BL.Models;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GenLearn.BL.Services
{
    public class UserService_BL : IUserService_BL
    {
        private readonly IUserService_DAL _userDal;
        private readonly IPromptService_BL _promptService;
        private readonly IOpenAIService _aiModel;
        private readonly IMapper _mapper;

        public UserService_BL(IUserService_DAL userDal, IPromptService_BL promptService, IOpenAIService aiModel, IMapper mapper)
        {
            _userDal = userDal;
            _promptService = promptService;
            _aiModel = aiModel;
            _mapper = mapper;
        }

        public async Task<UserDTO> RegisterUserAsync(string name, string phone)
        {
            var user = new User { Name = name, Phone = phone };
            var addedUser = await _userDal.AddUser(user);
            return _mapper.Map<UserDTO>(addedUser);
        }

        public async Task<string> SubmitPromptAsync(int userId, string categoryName, string subCategoryName, string promptText)
        {
            // שלב 1: אחסון ההנחיה בדאטהבייס
            var promptDTO = await _promptService.CreatePromptAsync(userId, categoryName, subCategoryName, promptText);

            // שלב 2: שליחה למודל הבינה המלאכותית
            var aiResponse = await _aiModel.GetCompletionAsync(promptText);

            // שלב 3: שמירת התשובה בדאטהבייס
            await _promptService.AttachResponseAsync(promptDTO.Id, aiResponse);

            return aiResponse;
        }

        public async Task<IEnumerable<PromptDTO>> GetUserHistoryAsync(int userId)
        {
            var user = await _userDal.GetUserById(userId);
            if (user == null)
                return Enumerable.Empty<PromptDTO>();

            // ממפה את רשימת ה-Prompt ל-PromptDTO
            return _mapper.Map<IEnumerable<PromptDTO>>(user.Prompts);
        }

        public async Task<IEnumerable<UserDTO>> GetAllUsers()
        {
            var users = await _userDal.GetAllUsers();
            return _mapper.Map<IEnumerable<UserDTO>>(users);
        }

        public async Task<IEnumerable<PromptDTO>> GetAllPrompts()
        {
            var users = await _userDal.GetAllUsers();
            var allPrompts = users.SelectMany(u => u.Prompts).ToList();
            return _mapper.Map<IEnumerable<PromptDTO>>(allPrompts);
        }

        public async Task<bool> DeleteUser(int userId)
        {
            return await _userDal.DeleteUser(userId);
        }


    }
}

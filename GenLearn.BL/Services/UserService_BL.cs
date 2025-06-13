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

        public async Task<UserDTO> RegisterUser(string name, string phone)
        {
            // חיפוש לפי *שם וטלפון* יחד
            var existing = await _userDal.GetUser(name, phone);

            if (existing != null)
            {
                // כבר קיים → מחזירים
                return _mapper.Map<UserDTO>(existing);
            }

            // לא קיים → יוצרים חדש
            var newUser = new User { Name = name, Phone = phone };
            var added = await _userDal.AddUser(newUser);

            return _mapper.Map<UserDTO>(added);
        }



        //public async Task<string> SubmitPrompt(int userId, string categoryName, string subCategoryName, string promptText)
        //{
        //    // שלב 1: אחסון ההנחיה בדאטהבייס
        //    var promptDTO = await _promptService.CreatePrompt(userId, categoryName, subCategoryName, promptText);

        //    // שלב 2: שליחה למודל הבינה המלאכותית
        //    var aiResponse = await _aiModel.GetCompletionAsync(promptText);

        //    // שלב 3: שמירת התשובה בדאטהבייס
        //    await _promptService.AttachResponse(promptDTO.Id, aiResponse);

        //    return aiResponse;
        //}

        /// Retrieves all prompts submitted by a specific user
        public async Task<IEnumerable<PromptDTO>> GetUserHistory(int userId)
        {
            var user = await _userDal.GetById(userId);
            if (user == null)
                return Enumerable.Empty<PromptDTO>();
           
            return _mapper.Map<IEnumerable<PromptDTO>>(user.Prompts);
        }

        public async Task<IEnumerable<UserDTO>> GetAllUsers()
        {
            var users = await _userDal.GetAllUsers();
            return _mapper.Map<IEnumerable<UserDTO>>(users);
        }

        /// Returns all prompts from all users
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

        /// Finds a user by name and phone number
        public async Task<UserDTO> GetUserDetails(string name, string phone)
        {
            var user = await _userDal.GetUser(name, phone);
            return  _mapper.Map<UserDTO>(user);
        }

        /// Retrieves the user entity by ID (used internally)
        public async Task<User?> GetUserById(int id)
        {
            return await _userDal.GetById(id);
        }

        public async Task<User?> UpdateUser(User user)
        {
            if (string.IsNullOrWhiteSpace(user.Name))
                throw new ArgumentException("The name cannot be empty.");
            if (string.IsNullOrWhiteSpace(user.Phone))
                throw new ArgumentException("Phone number cannot be empty.");

            return await _userDal.UpdateUser(user);
        }


    }
}

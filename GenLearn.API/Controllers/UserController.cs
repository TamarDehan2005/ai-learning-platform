using Microsoft.AspNetCore.Mvc;
using GenLearn.BL.Api;
using GenLearn.BL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GenLearn.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService_BL _userService;
        private readonly IPromptService_BL _promptService;

        public UsersController(IUserService_BL userService,IPromptService_BL promptService)
        {
            _userService = userService;
            _promptService = promptService;
        }

      
        /// <param name="dto">UserDTO עם שם וטלפון</param>
        
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> RegisterUser([FromBody] UserDTO dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.Name) || string.IsNullOrWhiteSpace(dto.Phone))
                return BadRequest("יש למלא שם ומספר טלפון.");

            var user = await _userService.RegisterUserAsync(dto.Name, dto.Phone);
            return Ok(user);
        }

        /// שליחת פרומפט למערכת AI והחזרת תגובה
        [HttpPost("submit-prompt")]
        public async Task<ActionResult<string>> SubmitPrompt([FromBody] HandlePromptRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var response = await _promptService.HandleUserPromptAsync(
                    request.UserId,
                    request.CategoryName,
                    request.SubCategoryName,
                    request.PromptText
                );

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאה: {ex.Message}");
            }
        }


        /// קבלת היסטוריית למידה לפי מזהה משתמש

        [HttpGet("{userId}/history")]
        public async Task<ActionResult<IEnumerable<PromptDTO>>> GetUserHistory(int userId)
        {
            var history = await _userService.GetUserHistoryAsync(userId);
            if (history == null)
                return NotFound("לא נמצאה היסטוריה למשתמש זה.");

            return Ok(history);
        }

       
        /// קבלת כל המשתמשים במערכת (לצורכי אדמין)
        
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetAllUsers()
        {
            var users = await _userService.GetAllUsers();
            return Ok(users);
        }

        
        /// קבלת כל ההנחיות של כל המשתמשים (לצורכי אדמין)
       
        [HttpGet("all-prompts")]
        public async Task<ActionResult<IEnumerable<PromptDTO>>> GetAllPrompts()
        {
            var prompts = await _userService.GetAllPrompts();
            return Ok(prompts);
        }

       
        /// מחיקת משתמש לפי מזהה
        
        [HttpDelete("delete/{userId}")]
        public async Task<ActionResult> DeleteUser(int userId)
        {
            var success = await _userService.DeleteUser(userId);
            if (!success)
                return NotFound("המשתמש לא נמצא או לא ניתן למחוק אותו.");

            return Ok("המשתמש נמחק בהצלחה.");
        }
    }
}

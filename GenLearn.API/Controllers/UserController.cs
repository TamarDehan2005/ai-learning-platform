using GenLearn.BL.Api;
using GenLearn.BL.Models;
using GenLearn.DAL.Models;
using Microsoft.AspNetCore.Mvc;
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


        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> RegisterUser([FromBody] UserDTO dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.Name) || string.IsNullOrWhiteSpace(dto.Phone))
                return BadRequest(new { message = "יש למלא שם ומספר טלפון." });

            var existingUser = await _userService.GetUserDetails(dto.Name, dto.Phone);

            if (existingUser != null)
                return Conflict(new { message = "משתמש כבר קיים." });

            var createdUser = await _userService.CreateUser(dto); // את זו תכתבי אם עוד לא קיימת

            return Ok(createdUser);
        }


        // POST api/users/submit-prompt
        [HttpPost("submit-prompt")]
        public async Task<ActionResult<string>> SubmitPrompt([FromBody] HandlePromptRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var response = await _promptService.HandleUserPrompt(
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


        // GET api/users/{userId}/history

        [HttpGet("{userId}/history")]
        public async Task<ActionResult<IEnumerable<PromptDTO>>> GetUserHistory(int userId)
        {
            var history = await _userService.GetUserHistory(userId);
            if (history == null)
                return NotFound("לא נמצאה היסטוריה למשתמש זה.");

            return Ok(history);
        }

        // GET api/users/all

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetAllUsers()
        {
            var users = await _userService.GetAllUsers();
            return Ok(users);
        }


        // GET api/users/all-prompts

        [HttpGet("all-prompts")]
        public async Task<ActionResult<IEnumerable<PromptDTO>>> GetAllPrompts()
        {
            var prompts = await _userService.GetAllPrompts();
            return Ok(prompts);
        }


        // DELETE api/users/delete/{userId}
     
        [HttpDelete("delete/{userId}")]
        public async Task<ActionResult> DeleteUser(int userId)
        {
            var success = await _userService.DeleteUser(userId);
            if (!success)
                return NotFound("המשתמש לא נמצא או לא ניתן למחוק אותו.");

            return Ok("המשתמש נמחק בהצלחה.");
        }

        // GET api/users/{userId}
    
        [HttpGet("{userId}")]
        public async Task<ActionResult<UserDTO>> GetUserDetails(int userId)
        {
            var user = await _userService.GetUserById(userId);
            if (user == null)
                return NotFound("המשתמש לא נמצא.");
            return Ok(user);
        }

        // POST api/users/login
       
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> CheckUser([FromBody] UserDTO user1)
        {
            
            if (string.IsNullOrWhiteSpace(user1.Name) || string.IsNullOrWhiteSpace(user1.Phone))
                return BadRequest(new { message = "יש למלא שם ומספר טלפון." });

            var user = await _userService.GetUserDetails(user1.Name, user1.Phone);
            if (user == null)
                return NotFound(new { message = "משתמש לא נמצא" });

            return Ok(user);
        }
        
        // PUT api/users/{id}
      
        [HttpPut("{id}")]
        public async Task<ActionResult<User>> UpdateUser(int id, [FromBody] User user)
        {
            if (id != user.Id)
                return BadRequest("ה־ID ב־URL לא תואם ל־ID של המשתמש");

            try
            {
                var updated = await _userService.UpdateUser(user);
                if (updated == null)
                    return NotFound();

                return Ok(updated);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

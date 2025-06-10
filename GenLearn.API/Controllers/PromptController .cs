using GenLearn.BL.Api;
using GenLearn.BL.Models;
using Microsoft.AspNetCore.Mvc;

namespace GenLearn.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PromptsController : ControllerBase
    {
        private readonly IPromptService_BL _promptService;

        public PromptsController(IPromptService_BL promptService)
        {
            _promptService = promptService;
        }

        // POST api/prompts/handle
        // שולח prompt ל-AI, שומר תשובה ומחזיר את התוצאה
        [HttpPost("handle")]
        public async Task<IActionResult> HandleUserPrompt([FromBody] HandlePromptRequest request)
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

                return Ok(new { response });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        // GET api/prompts/user/5
        // מחזיר את כל ההנחיות של משתמש ספציפי
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetAllUserPrompts(int userId)
        {
            var prompts = await _promptService.GetAllUserPromptsAsync(userId);
            return Ok(prompts);
        }
    }

    // DTO לקבלת בקשות של HandleUserPrompt
    public class HandlePromptRequest
    {
        public int UserId { get; set; }
        public string CategoryName{ get; set; }
        public string SubCategoryName { get; set; }
        public string PromptText { get; set; } = null!;
    }
}

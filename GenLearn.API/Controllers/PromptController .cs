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

        [HttpPost("handle")]
        public async Task<IActionResult> HandleUserPrompt([FromBody] HandlePromptRequest request)
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

                return Ok(new { response });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }

    // DTO לקבלת בקשות של HandleUserPrompt
    public class HandlePromptRequest
    {
        public int UserId { get; set; }
        public string CategoryName{ get; set; } = null!;
        public string SubCategoryName { get; set; } = null!;
        public string PromptText { get; set; } = null!;
    }
}

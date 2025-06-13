using Microsoft.AspNetCore.Mvc;
using GenLearn.BL.Api;
using GenLearn.BL.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace GenLearn.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubCategoriesController : ControllerBase
    {
        private readonly ISubCategoryService_BL _subCategoryService;

        public SubCategoriesController(ISubCategoryService_BL subCategoryService)
        {
            _subCategoryService = subCategoryService;
        }

        // GET api/subcategories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubCategoryDTO>>> GetAll()
        {
            var subCategories = await _subCategoryService.GetAllSubCategories();
            return Ok(subCategories);
        }

        // GET api/subcategories/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<SubCategoryDTO>> GetById(int id)
        {
            var subCategory = await _subCategoryService.GetSubCategoryById(id);
            if (subCategory == null)
                return NotFound();

            return Ok(subCategory);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<SubCategoryDTO>> Update(int id, [FromBody] SubCategoryDTO subCategoryDto)
        {
            if (id != subCategoryDto.Id)
                return BadRequest("ID mismatch.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var updatedSubCategory = await _subCategoryService.UpdateSubCategory(subCategoryDto);
                if (updatedSubCategory == null)
                    return NotFound();

                return Ok(updatedSubCategory);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while updating the subcategory.");
            }
        }


        // DELETE api/subcategories/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _subCategoryService.DeleteSubCategory(id);
            if (!deleted)
                return NotFound();

            return NoContent();
        }
        // POST api/subcategories
        [HttpPost]
        public async Task<ActionResult<SubCategoryDTO>> Create([FromBody] SubCategoryDTO subCategoryDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdSubCategory = await _subCategoryService.AddSubCategory(subCategoryDto);
            if (createdSubCategory == null)
                return Conflict("SubCategory name already exists.");

            return CreatedAtAction(nameof(GetById), new { id = createdSubCategory.Id }, createdSubCategory);
        }

    }
}

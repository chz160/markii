using Microsoft.AspNetCore.Mvc;
using TaagBack.Api.Models;
using TaagBack.Api.Services;

namespace TaagBack.Api.Controllers;

/// <summary>
/// Manages scavenger hunts.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class HuntsController : ControllerBase
{
    private readonly IHuntService _huntService;

    public HuntsController(IHuntService huntService)
    {
        _huntService = huntService;
    }

    /// <summary>Gets all hunts.</summary>
    [HttpGet]
    public ActionResult<IEnumerable<Hunt>> GetAll() => Ok(_huntService.GetAll());

    /// <summary>Gets a hunt by ID.</summary>
    [HttpGet("{id:guid}")]
    public ActionResult<Hunt> GetById(Guid id)
    {
        var hunt = _huntService.GetById(id);
        return hunt is null ? NotFound() : Ok(hunt);
    }

    /// <summary>Creates a new hunt.</summary>
    [HttpPost]
    public ActionResult<Hunt> Create([FromBody] Hunt hunt)
    {
        var created = _huntService.Create(hunt);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    /// <summary>Updates an existing hunt.</summary>
    [HttpPut("{id:guid}")]
    public ActionResult<Hunt> Update(Guid id, [FromBody] Hunt hunt)
    {
        var updated = _huntService.Update(id, hunt);
        return updated is null ? NotFound() : Ok(updated);
    }

    /// <summary>Deletes a hunt.</summary>
    [HttpDelete("{id:guid}")]
    public IActionResult Delete(Guid id)
    {
        return _huntService.Delete(id) ? NoContent() : NotFound();
    }
}

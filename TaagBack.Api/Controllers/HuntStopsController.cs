using Microsoft.AspNetCore.Mvc;
using TaagBack.Api.Models;
using TaagBack.Api.Services;

namespace TaagBack.Api.Controllers;

/// <summary>
/// Manages stops within a scavenger hunt and QR code scanning.
/// </summary>
[ApiController]
[Route("api/hunts/{huntId:guid}/stops")]
public class HuntStopsController : ControllerBase
{
    private readonly IHuntStopService _stopService;
    private readonly IHuntService _huntService;

    public HuntStopsController(IHuntStopService stopService, IHuntService huntService)
    {
        _stopService = stopService;
        _huntService = huntService;
    }

    /// <summary>Gets all stops for a hunt.</summary>
    [HttpGet]
    public ActionResult<IEnumerable<HuntStop>> GetAll(Guid huntId)
    {
        if (_huntService.GetById(huntId) is null) return NotFound();
        return Ok(_stopService.GetByHuntId(huntId));
    }

    /// <summary>Gets a single stop by ID.</summary>
    [HttpGet("{id:guid}")]
    public ActionResult<HuntStop> GetById(Guid huntId, Guid id)
    {
        var stop = _stopService.GetById(id);
        return stop is null || stop.HuntId != huntId ? NotFound() : Ok(stop);
    }

    /// <summary>Creates a new stop in the hunt.</summary>
    [HttpPost]
    public ActionResult<HuntStop> Create(Guid huntId, [FromBody] HuntStop stop)
    {
        if (_huntService.GetById(huntId) is null) return NotFound();
        var created = _stopService.Create(huntId, stop);
        return CreatedAtAction(nameof(GetById), new { huntId, id = created.Id }, created);
    }

    /// <summary>Updates a stop.</summary>
    [HttpPut("{id:guid}")]
    public ActionResult<HuntStop> Update(Guid huntId, Guid id, [FromBody] HuntStop stop)
    {
        var updated = _stopService.Update(id, stop);
        return updated is null || updated.HuntId != huntId ? NotFound() : Ok(updated);
    }

    /// <summary>Deletes a stop.</summary>
    [HttpDelete("{id:guid}")]
    public IActionResult Delete(Guid huntId, Guid id)
    {
        var stop = _stopService.GetById(id);
        if (stop is null || stop.HuntId != huntId) return NotFound();
        return _stopService.Delete(id) ? NoContent() : NotFound();
    }
}

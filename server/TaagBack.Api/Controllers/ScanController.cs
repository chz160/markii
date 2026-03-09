using Microsoft.AspNetCore.Mvc;
using TaagBack.Api.Services;

namespace TaagBack.Api.Controllers;

/// <summary>
/// Handles QR code scanning to retrieve the next hunt stop.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class ScanController : ControllerBase
{
    private readonly IHuntStopService _stopService;

    public ScanController(IHuntStopService stopService)
    {
        _stopService = stopService;
    }

    /// <summary>
    /// Resolves a QR code token and returns the corresponding hunt stop.
    /// </summary>
    /// <param name="token">The unique QR code token embedded in the scanned QR image.</param>
    [HttpGet("{token}")]
    public IActionResult ScanQrCode(string token)
    {
        var stop = _stopService.GetByQrToken(token);
        return stop is null ? NotFound(new { message = "QR code not found or has expired." }) : Ok(stop);
    }
}

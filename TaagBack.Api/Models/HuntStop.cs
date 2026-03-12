namespace TaagBack.Api.Models;

/// <summary>
/// Represents a single stop (clue/location) in a scavenger hunt, identified by a QR code.
/// </summary>
public class HuntStop
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid HuntId { get; set; }
    public Hunt? Hunt { get; set; }
    public int Order { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Clue { get; set; }
    public string? Hint { get; set; }
    public string QrCodeToken { get; set; } = Guid.NewGuid().ToString("N");
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

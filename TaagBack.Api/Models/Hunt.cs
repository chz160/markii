namespace TaagBack.Api.Models;

/// <summary>
/// Represents a scavenger hunt.
/// </summary>
public class Hunt
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string CreatedByUserId { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public bool IsActive { get; set; } = true;
    public ICollection<HuntStop> Stops { get; set; } = new List<HuntStop>();
}

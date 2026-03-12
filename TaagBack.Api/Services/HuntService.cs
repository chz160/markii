using TaagBack.Api.Models;

namespace TaagBack.Api.Services;

/// <summary>
/// In-memory store for hunts. Replace with a database-backed implementation.
/// </summary>
public class HuntService : IHuntService
{
    private readonly List<Hunt> _hunts = new();

    public IEnumerable<Hunt> GetAll() => _hunts.AsReadOnly();

    public Hunt? GetById(Guid id) => _hunts.FirstOrDefault(h => h.Id == id);

    public Hunt Create(Hunt hunt)
    {
        hunt.Id = Guid.NewGuid();
        hunt.CreatedAt = DateTime.UtcNow;
        _hunts.Add(hunt);
        return hunt;
    }

    public Hunt? Update(Guid id, Hunt updated)
    {
        var existing = GetById(id);
        if (existing is null) return null;

        existing.Name = updated.Name;
        existing.Description = updated.Description;
        existing.IsActive = updated.IsActive;
        existing.UpdatedAt = DateTime.UtcNow;
        return existing;
    }

    public bool Delete(Guid id)
    {
        var hunt = GetById(id);
        if (hunt is null) return false;
        _hunts.Remove(hunt);
        return true;
    }
}

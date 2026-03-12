using TaagBack.Api.Models;

namespace TaagBack.Api.Services;

/// <summary>
/// In-memory store for hunt stops. Replace with a database-backed implementation.
/// </summary>
public class HuntStopService : IHuntStopService
{
    private readonly List<HuntStop> _stops = new();

    public IEnumerable<HuntStop> GetByHuntId(Guid huntId) =>
        _stops.Where(s => s.HuntId == huntId).OrderBy(s => s.Order).ToList();

    public HuntStop? GetById(Guid id) => _stops.FirstOrDefault(s => s.Id == id);

    public HuntStop? GetByQrToken(string token) =>
        _stops.FirstOrDefault(s => s.QrCodeToken == token);

    public HuntStop Create(Guid huntId, HuntStop stop)
    {
        stop.Id = Guid.NewGuid();
        stop.HuntId = huntId;
        stop.QrCodeToken = Guid.NewGuid().ToString("N");
        stop.CreatedAt = DateTime.UtcNow;
        _stops.Add(stop);
        return stop;
    }

    public HuntStop? Update(Guid id, HuntStop updated)
    {
        var existing = GetById(id);
        if (existing is null) return null;

        existing.Title = updated.Title;
        existing.Clue = updated.Clue;
        existing.Hint = updated.Hint;
        existing.Order = updated.Order;
        return existing;
    }

    public bool Delete(Guid id)
    {
        var stop = GetById(id);
        if (stop is null) return false;
        _stops.Remove(stop);
        return true;
    }
}

using TaagBack.Api.Models;

namespace TaagBack.Api.Services;

/// <summary>
/// Contract for hunt stop management operations.
/// </summary>
public interface IHuntStopService
{
    IEnumerable<HuntStop> GetByHuntId(Guid huntId);
    HuntStop? GetById(Guid id);
    HuntStop? GetByQrToken(string token);
    HuntStop Create(Guid huntId, HuntStop stop);
    HuntStop? Update(Guid id, HuntStop updated);
    bool Delete(Guid id);
}

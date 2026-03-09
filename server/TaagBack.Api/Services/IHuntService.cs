using TaagBack.Api.Models;

namespace TaagBack.Api.Services;

/// <summary>
/// Contract for hunt management operations.
/// </summary>
public interface IHuntService
{
    IEnumerable<Hunt> GetAll();
    Hunt? GetById(Guid id);
    Hunt Create(Hunt hunt);
    Hunt? Update(Guid id, Hunt updated);
    bool Delete(Guid id);
}

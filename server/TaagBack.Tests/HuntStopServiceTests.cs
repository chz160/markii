using TaagBack.Api.Models;
using TaagBack.Api.Services;

namespace TaagBack.Tests;

[TestFixture]
public class HuntStopServiceTests
{
    private HuntStopService _service = null!;
    private readonly Guid _huntId = Guid.NewGuid();

    [SetUp]
    public void Setup()
    {
        _service = new HuntStopService();
    }

    [Test]
    public void Create_ShouldAddStopWithQrToken()
    {
        var stop = new HuntStop { Title = "Clue #1", Order = 1 };
        var created = _service.Create(_huntId, stop);

        Assert.That(created.HuntId, Is.EqualTo(_huntId));
        Assert.That(created.QrCodeToken, Is.Not.Empty);
        Assert.That(created.Title, Is.EqualTo("Clue #1"));
    }

    [Test]
    public void GetByHuntId_ShouldReturnStopsInOrder()
    {
        _service.Create(_huntId, new HuntStop { Title = "Stop B", Order = 2 });
        _service.Create(_huntId, new HuntStop { Title = "Stop A", Order = 1 });

        var stops = _service.GetByHuntId(_huntId).ToList();

        Assert.That(stops.Count, Is.EqualTo(2));
        Assert.That(stops[0].Order, Is.EqualTo(1));
        Assert.That(stops[1].Order, Is.EqualTo(2));
    }

    [Test]
    public void GetByQrToken_ShouldReturnMatchingStop()
    {
        var created = _service.Create(_huntId, new HuntStop { Title = "Hidden Gem" });
        var found = _service.GetByQrToken(created.QrCodeToken);

        Assert.That(found, Is.Not.Null);
        Assert.That(found!.Title, Is.EqualTo("Hidden Gem"));
    }

    [Test]
    public void GetByQrToken_WithUnknownToken_ShouldReturnNull()
    {
        var result = _service.GetByQrToken("nonexistent-token");
        Assert.That(result, Is.Null);
    }

    [Test]
    public void Delete_ShouldRemoveStop()
    {
        var created = _service.Create(_huntId, new HuntStop { Title = "Temporary Stop" });
        var result = _service.Delete(created.Id);

        Assert.That(result, Is.True);
        Assert.That(_service.GetByHuntId(_huntId), Is.Empty);
    }
}

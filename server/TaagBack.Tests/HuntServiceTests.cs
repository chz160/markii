using TaagBack.Api.Models;
using TaagBack.Api.Services;

namespace TaagBack.Tests;

[TestFixture]
public class HuntServiceTests
{
    private HuntService _service = null!;

    [SetUp]
    public void Setup()
    {
        _service = new HuntService();
    }

    [Test]
    public void Create_ShouldAddHuntAndReturnIt()
    {
        var hunt = new Hunt { Name = "Downtown QR Quest", CreatedByUserId = "user-1" };
        var created = _service.Create(hunt);

        Assert.That(created.Id, Is.Not.EqualTo(Guid.Empty));
        Assert.That(created.Name, Is.EqualTo("Downtown QR Quest"));
        Assert.That(_service.GetAll().Count(), Is.EqualTo(1));
    }

    [Test]
    public void GetById_ShouldReturnCorrectHunt()
    {
        var hunt = _service.Create(new Hunt { Name = "Park Adventure" });
        var found = _service.GetById(hunt.Id);

        Assert.That(found, Is.Not.Null);
        Assert.That(found!.Name, Is.EqualTo("Park Adventure"));
    }

    [Test]
    public void GetById_WithUnknownId_ShouldReturnNull()
    {
        var result = _service.GetById(Guid.NewGuid());
        Assert.That(result, Is.Null);
    }

    [Test]
    public void Update_ShouldModifyExistingHunt()
    {
        var hunt = _service.Create(new Hunt { Name = "Old Name" });
        var updated = _service.Update(hunt.Id, new Hunt { Name = "New Name", IsActive = false });

        Assert.That(updated, Is.Not.Null);
        Assert.That(updated!.Name, Is.EqualTo("New Name"));
        Assert.That(updated.IsActive, Is.False);
        Assert.That(updated.UpdatedAt, Is.Not.Null);
    }

    [Test]
    public void Delete_ShouldRemoveHunt()
    {
        var hunt = _service.Create(new Hunt { Name = "To Delete" });
        var result = _service.Delete(hunt.Id);

        Assert.That(result, Is.True);
        Assert.That(_service.GetAll(), Is.Empty);
    }

    [Test]
    public void Delete_WithUnknownId_ShouldReturnFalse()
    {
        var result = _service.Delete(Guid.NewGuid());
        Assert.That(result, Is.False);
    }
}

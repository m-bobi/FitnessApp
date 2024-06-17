namespace backend.Models;

public class Satellite
{
    public int SatelliteID { get; set; }
    public string Name { get; set; }
    public bool IsDeleted { get; set; } = false;
    public int PlanetID { get; set; }
}
namespace backend.Models;

public class Planet
{
    public int PlanetID { get; set; }
    public string Name { get; set; }
    public string Type { get; set; }
    
    public bool IsDeleted { get; set; } = false;
}
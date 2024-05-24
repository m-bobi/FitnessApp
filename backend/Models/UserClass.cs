namespace backend.Models;

public class UserClass
{
    public string UserId { get; set; }
    public User User { get; set; }

    public int ClassId { get; set; }
    public Class Class { get; set; }
}
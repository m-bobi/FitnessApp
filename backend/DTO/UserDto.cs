using backend.Enums;
namespace backend.DTO;

public class UserDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Gender { get; set; }
    public string Address { get; set; }
    public string PhoneNumber { get; set; }
    
    public DateTime? Birthdate { get; set; }
    public string? Email { get; set; }
    public string Token { get; set; }
    public string RefreshToken { get; set; }
    public string Username { get; set; }
    
    public Roles Role { get; set; }

}
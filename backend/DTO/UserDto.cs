using backend.Enums;
namespace backend.DTO;

public class UserDto
{
    public string Id { get; set; }
    public String? Email { get; set; }
    public string Token { get; set; }
    public string Image {get; set; }
    public string Username { get; set; }
    public Roles Role { get; set; }

}
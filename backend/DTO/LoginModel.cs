using backend.Enums;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;

namespace backend.DTO;

public class LoginModel
{
    public string Id { get; set; }
    public string? DisplayName { get; set; }

    public String? Email { get; set; }
    public string Token { get; set; }
    public string Image {get; set; }
    public string Username { get; set; }
    public Roles Role { get; set; }

}
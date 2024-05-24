using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Models;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services;

public class TokenService
{
    private const int ExpirationMinutes = 30;
    private readonly IConfiguration _configuration;

    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string CreateToken(User user)
    {
        var token = new JwtSecurityToken(
            _configuration["JwtTokenSettings:ValidIssuer"],
            _configuration["JwtTokenSettings:ValidAudience"],
            CreateClaims(user),
            expires: DateTime.UtcNow.AddMinutes(ExpirationMinutes),
            signingCredentials: CreateSigningCredentials()
        );
        
        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private List<Claim> CreateClaims(User user)
    {
        return new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, _configuration["JwtTokenSettings:JwtRegisteredClaimNamesSub"]),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        };
    }

    private SigningCredentials CreateSigningCredentials()
    {
        return new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtTokenSettings:SymmetricSecurityKey"])),
            SecurityAlgorithms.HmacSha256
        );
    }
}
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.DbContext;
using backend.Models;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services;

public class TokenService
{
    // private const int ExpirationMinutes = 30;
    // private const int RefreshTokenExpirationMinutes = 10080;
    
    private const int ExpirationMinutes = 60;
    private const int RefreshTokenExpirationMinutes = 10080;
    private readonly IConfiguration _configuration;
    private readonly ApplicationDbContext _context;

    public TokenService(IConfiguration configuration, ApplicationDbContext context)
    {
        _configuration = configuration;
        _context = context;
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
   
    private string CreateRefreshToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_configuration["JwtTokenSettings:SymmetricSecurityKey"]);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] { new Claim("refreshTokenId", user.Id) }),
            Expires = DateTime.UtcNow.AddMinutes(RefreshTokenExpirationMinutes),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
    
    public string RefreshAccessToken(string refreshToken)
    {
        var user = _context.Users.SingleOrDefault(u => u.RefreshToken == refreshToken);
        if (user == null)
        {
            throw new Exception("Invalid refresh token");
        }

        var newAccessToken = CreateToken(user);

        var newRefreshToken = CreateRefreshToken(user);
        user.RefreshToken = newRefreshToken;

        return newAccessToken;
    }
    
    public (string AccessToken, string RefreshToken) CreateTokens(User user)
    {
        var accessToken = CreateToken(user);
        var refreshToken = CreateRefreshToken(user);

        user.RefreshToken = refreshToken;

        return (accessToken, refreshToken);
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
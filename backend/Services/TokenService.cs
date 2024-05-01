using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services;

public class TokenService
{
    private readonly UserManager<User> _userManager;
    private readonly SigningCredentials _credentials;
    private readonly IConfiguration _configuration;

    public TokenService(UserManager<User> userManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _configuration = configuration;

        var secret = configuration["Jwt:Secret"];
        _credentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret)),
            SecurityAlgorithms.HmacSha256);
    }

    public async Task<string> GenerateToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Name, user.UserName)
        };

        var roles = await _userManager.GetRolesAsync(user);
        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = _credentials
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var securityToken = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(securityToken);
    }

    public async Task<bool> ValidateToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();

        try
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true, // Verify the signing key
                IssuerSigningKey = _credentials.Key,
                ValidateIssuer = true, // Validate the issuer (optional)
                ValidateAudience = true, // Validate the audience (optional)
                ValidateLifetime = true, // Validate expiration time
                ClockSkew = TimeSpan.Zero // Set clock skew to zero for strict time validation (optional)
            };

            // Try to parse and validate the token
            var securityToken = tokenHandler.ReadToken(token);
            var principal = await tokenHandler.ValidateTokenAsync(securityToken, tokenValidationParameters);

            // Check if the user associated with the token exists (optional)
            var userId = principal.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId);
            return user != null; // Check if user exists

        }
        catch (SecurityTokenException ex)
        {
            // Handle security token exceptions (e.g., invalid signature, expired token)
            Console.WriteLine($"Security Token Exception: {ex.Message}");
            return false;
        }
    }
}
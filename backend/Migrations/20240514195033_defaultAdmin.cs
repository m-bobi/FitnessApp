using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class defaultAdmin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "Address", "Age", "ConcurrencyStamp", "CreatedAt", "Email", "EmailConfirmed", "Gender", "LockoutEnabled", "LockoutEnd", "Name", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "Role", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "80c8b6b1-e2b6-45e8-b044-8f2178a90111", 0, "admin street", 20, "2482d7f4-ac5c-4fde-9b0e-4361aa3a4849", new DateTime(2024, 5, 14, 19, 50, 33, 7, DateTimeKind.Utc).AddTicks(1904), "root@email.com", false, "Male", false, null, "Admin", "ROOT@EMAIL.COM", "ROOT@EMAIL.COM", "AQAAAAIAAYagAAAAEORKZe9f3vUQQus4uuBEy/vtSLAs9Od1aHJkhuUMJplXQuWwAry9BHIQ2XCi/2u7KQ==", "044234234", false, 1, "ba4e8fc3-0ff0-4149-920e-655fe5608ee6", false, "admin" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111");
        }
    }
}

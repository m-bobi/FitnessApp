using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class newControllers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "b2add784-26f5-484e-90aa-7b315786a9ff", new DateTime(2024, 5, 15, 18, 58, 24, 238, DateTimeKind.Utc).AddTicks(3343), "AQAAAAIAAYagAAAAEDJ4lGFY1ta7Sxy2iR7H6uaN73TnHB/ifkZfeZt81uWnk0Si+3hqVodaWnrjeLvjuw==", "057347cc-32ec-4807-94e2-ee7ee298f479" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "2482d7f4-ac5c-4fde-9b0e-4361aa3a4849", new DateTime(2024, 5, 14, 19, 50, 33, 7, DateTimeKind.Utc).AddTicks(1904), "AQAAAAIAAYagAAAAEORKZe9f3vUQQus4uuBEy/vtSLAs9Od1aHJkhuUMJplXQuWwAry9BHIQ2XCi/2u7KQ==", "ba4e8fc3-0ff0-4149-920e-655fe5608ee6" });
        }
    }
}

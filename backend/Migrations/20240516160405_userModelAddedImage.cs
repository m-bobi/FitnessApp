using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class userModelAddedImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "AspNetUsers",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "Image", "PasswordHash", "SecurityStamp" },
                values: new object[] { "03c5b672-b4ce-472d-a6c1-becd7a49ffbd", new DateTime(2024, 5, 16, 16, 4, 4, 298, DateTimeKind.Utc).AddTicks(4451), null, "AQAAAAIAAYagAAAAEPoG44kM0nQzbxooRP9mlR3P8xXw3R8QaZ3Z8yYLLotqgBN4YORxYnyycV/bPclXJQ==", "17f0fa1c-9b17-4d1e-80dd-7e7b0c13f677" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "AspNetUsers");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "18ff995b-2522-43d9-aee9-dcc9eb4afebd", new DateTime(2024, 5, 16, 15, 5, 10, 728, DateTimeKind.Utc).AddTicks(3110), "AQAAAAIAAYagAAAAEPfS180qoQ2guuWeOuaFqAU0f0uv3UKRfpYlSTLRjh7D3XYMSpyBvD97mehdgY9ZLA==", "9cbaa372-6515-48d2-b170-62dd04007e73" });
        }
    }
}

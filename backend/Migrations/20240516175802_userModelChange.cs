using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class userModelChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "18c2ad89-0f35-492e-bb2d-1cac3ec8519d", new DateTime(2024, 5, 16, 17, 58, 1, 441, DateTimeKind.Utc).AddTicks(8988), "AQAAAAIAAYagAAAAEBpufRGTUQS2llR9lUvsVUxtHoYsYyA8YtqpVXsyU8xQsRy+fX2oYnc8Ct3EGEjV/A==", "9f0a8bce-c076-4c10-a64b-5118ba25fd90" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "03c5b672-b4ce-472d-a6c1-becd7a49ffbd", new DateTime(2024, 5, 16, 16, 4, 4, 298, DateTimeKind.Utc).AddTicks(4451), "AQAAAAIAAYagAAAAEPoG44kM0nQzbxooRP9mlR3P8xXw3R8QaZ3Z8yYLLotqgBN4YORxYnyycV/bPclXJQ==", "17f0fa1c-9b17-4d1e-80dd-7e7b0c13f677" });
        }
    }
}

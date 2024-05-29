using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class changesMade : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "4d6c7830-c4b3-4a4a-9924-0837d3038264", new DateTime(2024, 5, 29, 14, 59, 57, 875, DateTimeKind.Utc).AddTicks(7379), "AQAAAAIAAYagAAAAEEvY3kVzSrKjfc4LFOFarrB8rpgEPBoq1aj3Ep6TZj0nF7UFqOzexsSQALDQCrSi/Q==", "1de9fcef-de64-43f1-85bf-c42d6b8cdc13" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "ba0f9137-114f-4982-9e6a-09a9763cfff9", new DateTime(2024, 5, 29, 14, 46, 43, 898, DateTimeKind.Utc).AddTicks(2064), "AQAAAAIAAYagAAAAED+F/d86d6QulLe0LdBWu4/yD5q+nnHorFbqJ2UJMFX8+t18MqpIvwMgHrasWi7dVQ==", "a5965684-e466-4362-aada-d08f358b5d2e" });
        }
    }
}

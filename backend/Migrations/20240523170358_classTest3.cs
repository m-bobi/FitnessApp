using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class classTest3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d8a180c2-5123-4018-b6f4-ac9af54a802c", new DateTime(2024, 5, 23, 17, 3, 57, 372, DateTimeKind.Utc).AddTicks(6591), "AQAAAAIAAYagAAAAEIO00BUDmLrTy8p17btrfTto5LBUkGDoxjKDL30YXs8a5Ki+fKUJ8cnUOm4MGYoQVA==", "6eb5561a-fea4-40ea-8bda-4c936636167b" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "4f9ce6ab-4a90-46aa-b604-3b8263110369", new DateTime(2024, 5, 23, 16, 49, 23, 798, DateTimeKind.Utc).AddTicks(6112), "AQAAAAIAAYagAAAAEMtQezbofU1I886JsDrLH3luMHZ3x3Y7HPYCGcEkFF0VNQ8Jx3IcO/tVlgtsEk3bjQ==", "3e0119e2-c80b-4088-abfd-a0025a532cc8" });
        }
    }
}

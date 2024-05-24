using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class classTest4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "60616ec6-1c1a-4705-8ec8-0790f9e8b87c", new DateTime(2024, 5, 23, 17, 13, 12, 714, DateTimeKind.Utc).AddTicks(3797), "AQAAAAIAAYagAAAAEN6tEhRY73cNAwyZF3vJ7IzR1zXHcrVXoh3t2EpbRy5AfeoevIUw5CeeARIdC0tsYw==", "e92f0ea2-c0fa-4115-b5fe-d8a01a0ad220" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d8a180c2-5123-4018-b6f4-ac9af54a802c", new DateTime(2024, 5, 23, 17, 3, 57, 372, DateTimeKind.Utc).AddTicks(6591), "AQAAAAIAAYagAAAAEIO00BUDmLrTy8p17btrfTto5LBUkGDoxjKDL30YXs8a5Ki+fKUJ8cnUOm4MGYoQVA==", "6eb5561a-fea4-40ea-8bda-4c936636167b" });
        }
    }
}

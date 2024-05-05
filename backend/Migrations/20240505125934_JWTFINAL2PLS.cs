using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class JWTFINAL2PLS : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Gender",
                table: "AspNetUsers",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "79e59841-7397-4321-a323-245e9d45aed3", new DateTime(2024, 5, 5, 12, 59, 33, 763, DateTimeKind.Utc).AddTicks(8694), "AQAAAAIAAYagAAAAEO1XcB04Fp+p0rKtKO9gY3OvkA+hX1jOHgj9hmYxAyZ+GQufQSPmt28vNgmxJVF3nw==", "493c1983-f372-414e-89c8-39452a88b832" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Gender",
                keyValue: null,
                column: "Gender",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Gender",
                table: "AspNetUsers",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "11c25e26-4dab-41e1-a789-ac512a66833d", new DateTime(2024, 5, 5, 12, 55, 34, 519, DateTimeKind.Utc).AddTicks(4032), "AQAAAAIAAYagAAAAEPAH/mNvjostnWae0IhcE0qqrhQfZ+9NgTmHrVjFL1BeVqexaGQRvDoWwpQYcXj8LQ==", "3dac73b2-2e0e-49f4-94d9-9a361a1afa74" });
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class JWTFINALLLPLS : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Age",
                table: "AspNetUsers",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d9370711-3e3c-474d-a9cb-de0fcc3c1bdc", new DateTime(2024, 5, 5, 13, 1, 38, 555, DateTimeKind.Utc).AddTicks(7662), "AQAAAAIAAYagAAAAEOMkWQzMabvDbCTBPj8c2MHQfV1s6fcGMG8KJWlw3yoVGLEEWSRW7+e7fVIZ8ZKYHA==", "ac90d241-2477-45de-8973-b36f434dd0ec" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Age",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "79e59841-7397-4321-a323-245e9d45aed3", new DateTime(2024, 5, 5, 12, 59, 33, 763, DateTimeKind.Utc).AddTicks(8694), "AQAAAAIAAYagAAAAEO1XcB04Fp+p0rKtKO9gY3OvkA+hX1jOHgj9hmYxAyZ+GQufQSPmt28vNgmxJVF3nw==", "493c1983-f372-414e-89c8-39452a88b832" });
        }
    }
}

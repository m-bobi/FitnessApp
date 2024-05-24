using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class productRateAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductRate",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "4a4e369f-f82e-4130-8f99-fb689fd26314", new DateTime(2024, 5, 24, 16, 9, 12, 807, DateTimeKind.Utc).AddTicks(2419), "AQAAAAIAAYagAAAAEPG87Jv87AgCdy55W55uRhA1j4TUEdKQm6HCg8m9A/YcarJYR+mnRKTeX/KGtiYMTw==", "590c46e0-67b7-4818-8551-d5e0838e049b" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductRate",
                table: "Products");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "cdb1f897-357e-4cc4-890a-17244db97f1e", new DateTime(2024, 5, 24, 15, 55, 1, 61, DateTimeKind.Utc).AddTicks(4188), "AQAAAAIAAYagAAAAELwOGXMpZRGRT1dO0f0/FHrAsrU6JvsIFn2uL8zRn+9TA0/YRshv6q0X6urieDYnnw==", "8bdf50c7-9bfb-4312-a299-8ef033c3fb73" });
        }
    }
}

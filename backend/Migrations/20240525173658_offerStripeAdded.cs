using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class offerStripeAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "StripePriceId",
                table: "Offers",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "24d804c8-00c6-4df0-9187-cd2d2c297cda", new DateTime(2024, 5, 25, 17, 36, 57, 439, DateTimeKind.Utc).AddTicks(3629), "AQAAAAIAAYagAAAAEO4VJkzKGCnEosX/wNkssViMXkRJWjuXctWGj8NZzNUpmvSks9IDDmqBkXpCvMmjKQ==", "2924d6ca-3b26-454c-aeac-886a570e4d73" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StripePriceId",
                table: "Offers");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "1f6cb8a8-ff6d-4be9-87f7-47547d806180", new DateTime(2024, 5, 25, 9, 34, 23, 416, DateTimeKind.Utc).AddTicks(2163), "AQAAAAIAAYagAAAAEDpDdiTl56VnUys2fKrppURkgY2MsQQugh3B4+onac3F1Pj6kIy9Ccbbh1sf+gjvwg==", "3a08db04-823c-439e-855b-01a0b3db5fc2" });
        }
    }
}

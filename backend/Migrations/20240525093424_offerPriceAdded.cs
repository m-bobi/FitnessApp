using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class offerPriceAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OfferDurationDate",
                table: "Offers");

            migrationBuilder.DropColumn(
                name: "OfferEndDate",
                table: "Offers");

            migrationBuilder.RenameColumn(
                name: "OfferDiscount",
                table: "Offers",
                newName: "OfferPrice");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "1f6cb8a8-ff6d-4be9-87f7-47547d806180", new DateTime(2024, 5, 25, 9, 34, 23, 416, DateTimeKind.Utc).AddTicks(2163), "AQAAAAIAAYagAAAAEDpDdiTl56VnUys2fKrppURkgY2MsQQugh3B4+onac3F1Pj6kIy9Ccbbh1sf+gjvwg==", "3a08db04-823c-439e-855b-01a0b3db5fc2" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OfferPrice",
                table: "Offers",
                newName: "OfferDiscount");

            migrationBuilder.AddColumn<DateTime>(
                name: "OfferDurationDate",
                table: "Offers",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "OfferEndDate",
                table: "Offers",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "4a4e369f-f82e-4130-8f99-fb689fd26314", new DateTime(2024, 5, 24, 16, 9, 12, 807, DateTimeKind.Utc).AddTicks(2419), "AQAAAAIAAYagAAAAEPG87Jv87AgCdy55W55uRhA1j4TUEdKQm6HCg8m9A/YcarJYR+mnRKTeX/KGtiYMTw==", "590c46e0-67b7-4818-8551-d5e0838e049b" });
        }
    }
}

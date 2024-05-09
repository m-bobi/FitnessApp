using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class cleaningCodev2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Mobile",
                table: "AspNetUsers");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "PhoneNumber", "SecurityStamp" },
                values: new object[] { "806b3b0c-deb8-45cb-920c-c913402a4bbd", new DateTime(2024, 5, 9, 11, 47, 4, 934, DateTimeKind.Utc).AddTicks(6972), "AQAAAAIAAYagAAAAEG09cEIXXO2TCssR977e2M9fXl40PEsVlSMV14nph1ZkCcGyMZY+oLY5A8lSSwb8qg==", "044234234", "498a60f5-cff8-4b02-82c6-f7e3bdb92175" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Mobile",
                table: "AspNetUsers",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "Mobile", "PasswordHash", "PhoneNumber", "SecurityStamp" },
                values: new object[] { "d20e58d9-1ee6-4ca3-85c0-644d0339f2ac", new DateTime(2024, 5, 9, 11, 32, 49, 141, DateTimeKind.Utc).AddTicks(8713), "044234234", "AQAAAAIAAYagAAAAECRBdnWM/bvQLKWRfNEUZ4DsvtEZw2W0JigHETkwfZ2TIv0RjxTmCvZVbo79BoAOgQ==", null, "617d2343-1b84-42b8-90cf-f3eb8671a6cd" });
        }
    }
}

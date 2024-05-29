using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class anotherChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Contact",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "1b728692-b1c6-4273-b52f-88780e42eb44", new DateTime(2024, 5, 29, 15, 3, 9, 818, DateTimeKind.Utc).AddTicks(1065), "AQAAAAIAAYagAAAAEFxrUCjB2GMspau69KYtz2QyTtcdzeRSCGuSIRwOTfGLFA7u2sMMcRrNh1spXlJqrA==", "62c6fb0d-cba5-475d-aa43-8f7549a2c74a" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Contact",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "4d6c7830-c4b3-4a4a-9924-0837d3038264", new DateTime(2024, 5, 29, 14, 59, 57, 875, DateTimeKind.Utc).AddTicks(7379), "AQAAAAIAAYagAAAAEEvY3kVzSrKjfc4LFOFarrB8rpgEPBoq1aj3Ep6TZj0nF7UFqOzexsSQALDQCrSi/Q==", "1de9fcef-de64-43f1-85bf-c42d6b8cdc13" });
        }
    }
}

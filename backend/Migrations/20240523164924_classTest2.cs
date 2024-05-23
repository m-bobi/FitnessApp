using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class classTest2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Class_AspNetUsers_UserId",
                table: "Class");

            migrationBuilder.DropIndex(
                name: "IX_Class_UserId",
                table: "Class");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Class");

            migrationBuilder.CreateTable(
                name: "UserClasses",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ClassId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserClasses", x => new { x.UserId, x.ClassId });
                    table.ForeignKey(
                        name: "FK_UserClasses_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserClasses_Class_ClassId",
                        column: x => x.ClassId,
                        principalTable: "Class",
                        principalColumn: "ClassId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "4f9ce6ab-4a90-46aa-b604-3b8263110369", new DateTime(2024, 5, 23, 16, 49, 23, 798, DateTimeKind.Utc).AddTicks(6112), "AQAAAAIAAYagAAAAEMtQezbofU1I886JsDrLH3luMHZ3x3Y7HPYCGcEkFF0VNQ8Jx3IcO/tVlgtsEk3bjQ==", "3e0119e2-c80b-4088-abfd-a0025a532cc8" });

            migrationBuilder.CreateIndex(
                name: "IX_UserClasses_ClassId",
                table: "UserClasses",
                column: "ClassId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserClasses");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Class",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "b2881e7f-4318-4740-9a3e-57a972f52f62", new DateTime(2024, 5, 22, 7, 20, 7, 354, DateTimeKind.Utc).AddTicks(6666), "AQAAAAIAAYagAAAAENWix/nvzJwVIQnySwcZH8iVNXdLs63Htlc+IzyQG4ZlcbEzXN7SLNX0HWLPfwwGgQ==", "ed244500-3878-4ff5-b4e0-2fa9701f6ce6" });

            migrationBuilder.CreateIndex(
                name: "IX_Class_UserId",
                table: "Class",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Class_AspNetUsers_UserId",
                table: "Class",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

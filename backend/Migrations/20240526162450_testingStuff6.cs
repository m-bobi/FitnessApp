using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class testingStuff6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "52280b91-f8bf-410f-91c8-5d437919374b", new DateTime(2024, 5, 26, 16, 24, 49, 596, DateTimeKind.Utc).AddTicks(4262), "AQAAAAIAAYagAAAAEAJlYrCwzHmyqBfJljMMnjhiVpS3Ggt6CjP1vDbkz+Kri71GFrRhVD/CfPo9PO54IQ==", "be2e86f9-d1d1-477b-b986-3e752977dd17" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "f4eb606d-1dee-4db1-b78b-a89c01e1d3b0", new DateTime(2024, 5, 26, 16, 12, 33, 769, DateTimeKind.Utc).AddTicks(2447), "AQAAAAIAAYagAAAAECxdE9qqJDspUVijapxE7Z6h/+enm0WZjEF+VYnU68oHHrK8lqg1QUjZ2jL+tDmLwA==", "b8f128c5-0f22-4215-bc81-a533d3da1bef" });
        }
    }
}

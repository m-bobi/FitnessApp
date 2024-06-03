using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class workoutsChanged : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "WorkoutName",
                table: "Workouts",
                newName: "WorkoutType");

            migrationBuilder.RenameColumn(
                name: "WorkoutDescription",
                table: "Workouts",
                newName: "WorkoutStartTime");

            migrationBuilder.AddColumn<string>(
                name: "WorkoutEndTime",
                table: "Workouts",
                type: "varchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "dff782c1-bc4d-40b1-bd5d-106fb1acfd26", new DateTime(2024, 6, 3, 11, 36, 50, 152, DateTimeKind.Utc).AddTicks(114), "AQAAAAIAAYagAAAAEPk2CV2HimNnGSZc0NdzWWfJp2uEBkP5QlIRhqVHZG7Cu9X6fIv9lgKWtLzVK0XT3A==", "489dacd8-c8b8-4e3b-a907-078e299cbd0a" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WorkoutEndTime",
                table: "Workouts");

            migrationBuilder.RenameColumn(
                name: "WorkoutType",
                table: "Workouts",
                newName: "WorkoutName");

            migrationBuilder.RenameColumn(
                name: "WorkoutStartTime",
                table: "Workouts",
                newName: "WorkoutDescription");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "318c4a58-d040-43ff-ae07-fba281b7985d", new DateTime(2024, 6, 3, 7, 44, 26, 463, DateTimeKind.Utc).AddTicks(619), "AQAAAAIAAYagAAAAENHB6L8gX+8ZUJkmCJpNqAm6FlKI61KkFEDBRHc1Rddt/uTB15/4j7hj/4fF2eFbqQ==", "a95a64b1-730f-4727-a3e4-7bb7ee02f0f3" });
        }
    }
}

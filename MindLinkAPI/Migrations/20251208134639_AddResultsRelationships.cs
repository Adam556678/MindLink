using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MindLinkAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddResultsRelationships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Result_Quizzes_QuizId",
                table: "Result");

            migrationBuilder.DropForeignKey(
                name: "FK_Result_Users_UserId",
                table: "Result");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Result",
                table: "Result");

            migrationBuilder.RenameTable(
                name: "Result",
                newName: "Results");

            migrationBuilder.RenameIndex(
                name: "IX_Result_UserId",
                table: "Results",
                newName: "IX_Results_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Result_QuizId",
                table: "Results",
                newName: "IX_Results_QuizId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Results",
                table: "Results",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Results_Quizzes_QuizId",
                table: "Results",
                column: "QuizId",
                principalTable: "Quizzes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Results_Users_UserId",
                table: "Results",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Results_Quizzes_QuizId",
                table: "Results");

            migrationBuilder.DropForeignKey(
                name: "FK_Results_Users_UserId",
                table: "Results");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Results",
                table: "Results");

            migrationBuilder.RenameTable(
                name: "Results",
                newName: "Result");

            migrationBuilder.RenameIndex(
                name: "IX_Results_UserId",
                table: "Result",
                newName: "IX_Result_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Results_QuizId",
                table: "Result",
                newName: "IX_Result_QuizId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Result",
                table: "Result",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Result_Quizzes_QuizId",
                table: "Result",
                column: "QuizId",
                principalTable: "Quizzes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Result_Users_UserId",
                table: "Result",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

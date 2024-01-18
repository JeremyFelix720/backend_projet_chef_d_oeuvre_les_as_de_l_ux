import { DataTypes, Sequelize } from "sequelize";

export const CommentModel = (sequelize: Sequelize) => {
  return sequelize.define('comment', {
    content: DataTypes.STRING,
    rank: DataTypes.NUMBER
    // submitDate = CreatedAt
  });
}
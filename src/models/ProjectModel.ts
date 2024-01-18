import { DataTypes, Sequelize } from "sequelize";

export const ProjectModel = (sequelize: Sequelize) => {
  return sequelize.define('project', {
    title: DataTypes.STRING,
    bannerUrl: DataTypes.STRING,
    websiteUrl: DataTypes.STRING,
    description: DataTypes.STRING,
    budget: DataTypes.NUMBER,
    comment: DataTypes.NUMBER,
    maximumComments: DataTypes.NUMBER
  });
}
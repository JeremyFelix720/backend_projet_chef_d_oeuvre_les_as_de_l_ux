import { DataTypes, Sequelize } from "sequelize";

export const ProjectModel = (sequelize: Sequelize) => {
  return sequelize.define('project', {
    title: {
      type: DataTypes.STRING,
      allowNull: false, // champs obligatoire (option par défaut)
      unique: true // enregistrement unique
    },
    bannerUrl: {
      type: DataTypes.STRING,
      allowNull: true, // champs non obligatoire
      unique: false // enregistrement non unique
    },
    websiteUrl: {
      type: DataTypes.STRING,
      allowNull: false, // champs obligatoire
      unique: true // enregistrement unique
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false, // champs obligatoire
      unique: true // enregistrement unique
    },
    budget: {
      type: DataTypes.NUMBER,
      allowNull: false, // champs obligatoire
      unique: false // enregistrement non unique
    },
    comment: DataTypes.NUMBER,
    maximumComments: DataTypes.NUMBER
  });
}
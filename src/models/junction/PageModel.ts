import { DataTypes, Sequelize } from "sequelize";

export const PageModel = (sequelize: Sequelize) => {
  return sequelize.define('page', {
    title: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    timestamps: false // supprime les champs ajoutés par défaut ("created_at" et "updated_at")
  });
}
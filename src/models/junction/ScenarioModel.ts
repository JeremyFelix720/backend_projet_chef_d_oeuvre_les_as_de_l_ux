import { DataTypes, Sequelize } from "sequelize";

export const ScenarioModel = (sequelize: Sequelize) => {
  return sequelize.define('scenario', {
    title: DataTypes.STRING
  }, {
    timestamps: false // supprime les champs ajoutés par défaut ("created_at" et "updated_at")
  });
}
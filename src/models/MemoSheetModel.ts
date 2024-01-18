import { DataTypes, Sequelize } from "sequelize";

export const MemoSheetModel = (sequelize: Sequelize) => {
  return sequelize.define('memo_sheet', {
    planUrl: DataTypes.STRING,
    title: DataTypes.STRING,
    observation: DataTypes.STRING,
    utility: DataTypes.STRING,
    advice: DataTypes.STRING,
    state: DataTypes.BOOLEAN
  }, {
    timestamps: false // supprime les champs ajoutés par défaut ("created_at" et "updated_at")
  });
}
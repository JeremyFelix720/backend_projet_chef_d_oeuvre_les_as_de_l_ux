import { DataTypes, Sequelize } from "sequelize";

export const UserModel = (sequelize: Sequelize) => {
  return sequelize.define('user', {
    pseudonym: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.NUMBER,
    city: DataTypes.STRING,
    postalCode: DataTypes.NUMBER,
    password: DataTypes.STRING,
    points: DataTypes.NUMBER,
    grade: DataTypes.STRING,
    rib: DataTypes.NUMBER
  });
}
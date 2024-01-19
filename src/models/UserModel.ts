import { DataTypes, Sequelize } from "sequelize";

export const UserModel = (sequelize: Sequelize) => {

  return sequelize.define('user', {
    pseudonym: {
      type: DataTypes.TEXT,
      allowNull: false, // champs obligatoire (option par défaut)
      unique: true // enregistrement unique
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true, // champ non obligatoire
      unique: false // enregistrement non unique
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    phoneNumber: {
      type: DataTypes.NUMBER,
      allowNull: true, // champ non obligatoire
      unique: true // enregistrement unique
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true, // champ non obligatoire
      unique: false // enregistrement non unique
    },
    postalCode: {
      type: DataTypes.NUMBER,
      allowNull: true, // champ non obligatoire
      unique: false // enregistrement non unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // champ obligatoire (option par défaut)
      unique: false // enregistrement non unique
    },
    rib: {
      type: DataTypes.NUMBER,
      allowNull: true, // champ non obligatoire
      unique: true // enregistrement unique
    },
    points: DataTypes.NUMBER,
    grade: DataTypes.STRING,
  });
}
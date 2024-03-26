// La liste des Tokens interdit sont ceux qui ont déjà été générés lors de précèdentes connexions des utilisateurs mais qui sont devenus périmés au bout d'un certain temps.

import { DataTypes, Sequelize } from "sequelize";

export const TokenBlackListModel = (sequelize: Sequelize) => {
    return sequelize.define('token-black-list', {
        token: DataTypes.STRING,
    });
}
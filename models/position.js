import { DataTypes, Model } from "sequelize";
import databaseConnection from "../config/database.js";

const schema = {
    id: {
        type: DataTypes.BIGINT,
        notNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    identification: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique:true /*Este dato es necesario o con el id unique es suficiente?*/
    },
    email: {
        type: DataTypes.STRING, /*No es necesario ingresar la cantidad del string? */
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        },
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    observation: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('ACTIVO', 'INACTIVO'),
        defaultValue: 'ACTIVO'
    }
}
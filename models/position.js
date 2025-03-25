import { DataTypes, Model } from "sequelize";
import databaseConnection from "../config/database.js";

/*
const schema = {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        autoInvrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    identificationNumber: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comments: {
        type: DataTypes.STRING
    },
    charge: {
        type: DataTypes.STRING
    },
    subManagement: {
        type: DataTypes.STRING
    },
    dependecy: {
        type: DataTypes.STRING
    }
}
*/

const schema = {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    identification: {
        type: DataTypes.BIGINT,
        unique: true,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
        validate: { isEmail: true }
    },
    nombres: {
        type: DataTypes.STRING,
        allowNull:true
    },
    observations: {
        type: DataTypes.STRING,
        allowNull: true
    },
    state: {
       type: DataTypes.STRING,
       allowNull: true,
       defaultValue: 'ACTIVO' 
    }
}

class Position extends Model {}

Position.init(schema, { sequelize: databaseConnection });

export default Position;
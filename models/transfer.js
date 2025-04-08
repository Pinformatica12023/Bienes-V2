import { DataTypes, Model } from "sequelize";
import databaseConnection from "../config/database.js";

const schema = {
    tag: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tagType: {
        type: DataTypes.ENUM('Gobernación', 'FLA')
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comments: {
        type: DataTypes.STRING
    },
    serialNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    }
    /*
    offcial: {},
    dependency: {},
    comments: {}
    */
}

class Transfer extends Model {}

Transfer.init(schema, { sequelize: databaseConnection });

export default Transfer;



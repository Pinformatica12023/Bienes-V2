import { DataTypes, Model } from "sequelize";
import databaseConnection from "../config/database.js";

const schema = {
    idNumber: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    notes: {
        type: DataTypes.STRING
    },
    hireDate: {
        type: DataTypes.DATEONLY
    }
}

class Official extends Model {}

Official.init(schema, { sequelize: databaseConnection });

export default Official;

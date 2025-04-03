import { DataTypes, Model } from "sequelize";
import databaseConnection from "../config/database.js";

const schema = {
    plateNumber: {
        type:DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    serieNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    }
}

class Inventory extends Model {}

Inventory.init(schema, { sequelize: databaseConnection });

export default Inventory;
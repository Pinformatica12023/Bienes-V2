import { DataTypes, Model } from "sequelize";
import databaseConnection from "../config/database.js";

const schema = {
    tag: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
    serialNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    }
}

class Item extends Model {}

Item.init(schema, { sequelize: databaseConnection });

export default Item;
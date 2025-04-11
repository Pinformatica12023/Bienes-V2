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
    },
    tagType: {
        type: DataTypes.ENUM('Gobernación', 'FLA')
    }
}

class Item extends Model {
    static associate(model) {
        Item.hasMany(models.Transfer, {
            foreignKey: "tag",
            sourcekey: "tag",
        });
    }
}

Item.init(schema, { sequelize: databaseConnection });

export default Item;
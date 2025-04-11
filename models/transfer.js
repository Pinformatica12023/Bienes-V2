import { DataTypes, Model } from "sequelize";
import databaseConnection from "../config/database.js";

const schema = {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    tag: {
        type: DataTypes.STRING,
        allowNull: false
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
    },
    fromPositionId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    toPositionId: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}

class Transfer extends Model {
    static associate(models) {
      Transfer.belongsTo(models.Item, {
        foreignKey: "tag",
        targetKey: "tag"
      });
  
      Transfer.belongsTo(models.Position, {
        foreignKey: "fromPositionId",
        as: "sender"
      });
  
      Transfer.belongsTo(models.Position, {
        foreignKey: "toPositionId",
        as: "receiver"
      });
    }
  }

Transfer.init(schema, { sequelize: databaseConnection });

export default Transfer;



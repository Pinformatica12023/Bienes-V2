import { DataTypes, Model } from "sequelize";
import databaseConnection from "../config/database.js";

const schema = {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.ENUM(
            'Despacho del gerente',
            'Secretaria general',
            'Subgerencia administrativa y financiera',
            'Subgerencia comercial',
            'Subgerencia mercadeo',
            'Subgerencia producción'
        ),
        allowNull: false
    }
}

class SubDepartment extends Model {}

SubDepartment.init(schema, { sequelize: databaseConnection });

export default SubDepartment;
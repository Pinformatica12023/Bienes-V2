import { DataTypes, Model } from "sequelize";
import databaseConnection from "../config/database.js";

const validDependencies = {
    "Despacho del gerente": ["Despacho del gerente", "Oficina de control interno disciplinario", "Oficina de comunicaciones", "Oficina de control interno", "Oficina de laboratorio", "Oficina de planeación", "Secretaria general", "Tecnologia de la información"],
    "Secretaria general": ["Dirección de apoyo contractual", "Secretaria general"],
    "Subgerencia Administrativa y Financiera": ["Dirección de gestión humana", "Dirección de recuersos coorporativos", "Dirección financiera y de planeación", "Oficinas de suministros", "Suberencia administrativa y financiera"],
    "Subgerencia Comercial": ["Dirección de negocios internacionales", "Direccion de ventas", "Dirección de ventas nacionales", "Subgerencia comercial", "Subgerencia comercial(Director zona antioquia)"],
    "Subgerencia de mercadeo": ["Dirección de marca - Aguardiente", "Dirección de marca - Ron", "Subgerencia de mercadeo", "Subgerencia de mercadeo - Innovación"],
    "Subgerencia de producción": ["Dirección de aseguramiento de la calidad", "Dirección de envasado y añejamiento", "Dirección de logística", "Oficina ambiental", "Subgerencia de producción", "Subgerencia de producción - Dirección mantenimiento"]
}

const schema = {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    name: {
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
        allowNull: false,
        unique: true
    },
    comments: {
        type: DataTypes.STRING
    },
    charge: {
        type: DataTypes.STRING
    },
    subManagement: {
        type: DataTypes.ENUM(...Object.keys(validDependencies)),
        allowNull: false
    },
    dependency: {
        type: DataTypes.ENUM(...new Set(Object.values(validDependencies).flat())),
        allowNull: false,
        validate: {
            isValidCombination() {
                const allowed = validDependencies[this.subManagement];
                if (!allowed || !allowed.includes(this.dependency)) {
                    throw new Error(`La dependencia '${this.dependency}' no es válida para la subgerencia '${this.subManagement}'`);
                }
            }
        }
    }
};

class Position extends Model {
    static associate(model) {
        Position.hasMany(models.Transfer, {
            foreignKey: "fromPositionId",
            as: "sentTransfers",
        });

        Position.hasMany(models.Transfer, {
            foreignKey: "toPositionId",
            as: "receivedTransfers",
        })
    }
}

Position.init(schema, { sequelize: databaseConnection });

export default Position;
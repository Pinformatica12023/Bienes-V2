import { DataTypes, Model } from "sequelize";
import databaseConnection from "../config/database.js";
import bcrypt from "bcryptjs";

const schema = {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    user_name: {
        type: DataTypes.STRING
    },
    passwordDigest: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.VIRTUAL,
        set(value) {
            this.setDataValue("passwordDigest", bcrypt.hashSync(value, 12));
        }
    }
}

class User extends Model {
    authenticate(value) {
        return bcrypt.compareSync(value, this.passwordDigest);
    }
}

User.init(schema, { sequelize: databaseConnection });

export default User;

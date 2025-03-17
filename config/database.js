import { Sequelize } from "sequelize";

const databaseConnection = new Sequelize({
    database: "bienes_test",
    username: "root",
    password: "Ti2023*",
    host: "localhost",
    dialect: "mysql" 
});

export default databaseConnection;

import { Sequelize } from "sequelize";
import databaseConnection from "../config/database.js";

import Item from "./Item.js";
import Position from "./Position.js";
import Transfer from "./Transfer.js";



// Agrupa los modelos en un solo objeto
const models = {
  Item,
  Position,
  Transfer
};

// Inicializa las asociaciones
Object.values(models).forEach((model) => {
  if (typeof model.associate === "function") {
    model.associate(models);
  }
});

// Exporta conexión y modelos
export { databaseConnection };
export default models;

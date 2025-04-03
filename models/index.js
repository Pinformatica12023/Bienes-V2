import { Sequelize } from 'sequelize';
import databaseConnection from '../config/database.js';

// Importar todos los modelos
import Official from './officials.js';
import Position from './positions.js';


// Definir asociaciones
const setupAssociations = () => {
  Official.belongsTo(Position, { foreignKey: 'positionId' });
  Position.hasMany(Official, { foreignKey: 'positionId' });

  SubDepartment.hasMany(Official, { foreignKey: 'subDepartmentId' });
  Official.belongsTo(SubDepartment, { foreignKey: 'subDepartmentId' });

};

export {
  Official,
  Position,
  SubDepartment,
  User,
  setupAssociations
};
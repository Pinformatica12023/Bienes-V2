const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Subgerencia = sequelize.define('Subgerencia', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  }, {
    timestamps: false, // Opcional: si no quieres campos `createdAt` y `updatedAt`
  });

  // Hook para insertar datos iniciales después de sincronizar
  Subgerencia.afterSync(async () => {
    try {
      await Subgerencia.bulkCreate([
        { name: 'Administración' },
        { name: 'Mercadeo' },
        { name: 'Logística' },
      ], {
        ignoreDuplicates: true, // Evita duplicados si ya existen
      });
      console.log('Datos iniciales de Subgerencia insertados.');
    } catch (error) {
      console.error('Error al insertar datos iniciales:', error);
    }
  });

  return Subgerencia;
};
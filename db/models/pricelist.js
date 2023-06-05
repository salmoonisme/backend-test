'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pricelists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pricelists.belongsTo(models.VehicleModels, { foreignKey: 'modelID' });
      Pricelists.belongsTo(models.VehicleYears, { foreignKey: 'yearID' });
    }
  }
  Pricelists.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    yearID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    modelID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price_inMillion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Pricelists',
    timestamps: true,
    freezeTableName: true
  });
  return Pricelists;
};
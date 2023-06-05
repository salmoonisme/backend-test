'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VehicleModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VehicleModels.belongsTo(models.VehicleBrands, { foreignKey: 'typeID' });
      VehicleModels.hasMany(models.Pricelists, { foreignKey: 'modelID' });
    }
  }
  VehicleModels.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    typeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'VehicleModels',
    timestamps: true,
    freezeTableName: true
  });
  return VehicleModels;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VehicleTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VehicleTypes.belongsTo(models.VehicleBrands, { foreignKey: 'brandID' });
      VehicleTypes.hasMany(models.VehicleModels, { foreignKey: 'typeID' });
    }
  }
  VehicleTypes.init({
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
    brandID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'VehicleTypes',
    timestamps: true,
    freezeTableName: true
  });
  return VehicleTypes;
};
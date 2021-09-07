'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class danhSachRap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Cinema, showTime }) {
      // define association here
      this.belongsTo(Cinema);
      this.hasMany(showTime);
    }
  };
  danhSachRap.init({
    maRap: DataTypes.INTEGER,
    tenRap: DataTypes.STRING,
    cinemaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'danhSachRap',
  });
  return danhSachRap;
};
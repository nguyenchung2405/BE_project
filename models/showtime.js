'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class showTime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ danhSachRap, Movie }) {
      // define association here
      this.belongsTo(danhSachRap, { foreignKey: "maRap" });
      this.belongsTo(Movie, { foreignKey: "movieId" });
    }
  };
  showTime.init({
    startTime: DataTypes.DATE,
    maRap: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'showTime',
  });
  return showTime;
};
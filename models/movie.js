'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Cinema, showTime }) {
      // define association here
      this.belongsToMany(User, { through: "Ticket" });
      this.belongsToMany(Cinema, { through: "Cinema_movie" });
      this.hasMany(showTime);
    }
  };
  movie.init({
    maPhim: DataTypes.INTEGER,
    tenPhim: DataTypes.STRING,
    moTa: DataTypes.STRING(1000),
    ngayKhoiChieu: DataTypes.DATE,
    maNhom: DataTypes.STRING,
    hinhAnh: DataTypes.STRING,
    trailer: DataTypes.STRING,
    danhGia: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return movie;
};
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      maPhim: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      tenPhim: {
        allowNull: false,
        type: Sequelize.STRING
      },
      moTa: {
        type: Sequelize.STRING(1000)
      },
      ngayKhoiChieu: {
        allowNull: false,
        type: Sequelize.DATE
      },
      maNhom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      hinhAnh: {
        allowNull: false,
        type: Sequelize.STRING
      },
      trailer: {
        allowNull: false,
        type: Sequelize.STRING
      },
      danhGia: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Movies');
  }
};
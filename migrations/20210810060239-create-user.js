'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      taiKhoan: {
        allowNull: false,
        type: Sequelize.STRING
      },
      matKhau: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      soDT: {
        allowNull: false,
        type: Sequelize.STRING
      },
      maNhom: {
        type: Sequelize.STRING,
      },
      maLoaiNguoiDung: {
        allowNull: false,
        type: Sequelize.STRING
      },
      hoTen: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Users');
  }
};
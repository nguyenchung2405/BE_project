const express = require("express");
const { getListUser, createUser, updateUser, signIn, layThongTinTaiKhoan, layDanhSachLoaiNguoiDung, layDanhSachNguoiDungPhanTrang, timKiemNguoiDung, timKiemNguoiDungPhanTrang, removeUser } = require("../controller/User/user.controller");
const { authenticate, authorize } = require("../middleware/auth/verify-token.middleware");
const { checkUserExistByEmail, checkExistById } = require("../middleware/validations/checkExist.middleware");
const userRouter = express.Router();
const { User } = require("../models");

userRouter.get("/LayDanhSachNguoiDung", getListUser);
userRouter.post("/DangKy", checkUserExistByEmail(User), createUser);
userRouter.put("/CapNhatThongTinNguoiDung", authenticate, checkExistById(User), updateUser);
userRouter.post("/DangNhap", signIn);
userRouter.post("/ThongTinTaiKhoan", layThongTinTaiKhoan);
userRouter.get("/LayDanhSachLoaiNguoiDung", layDanhSachLoaiNguoiDung);
userRouter.get("/LayDanhSachNguoiDungPhanTrang", layDanhSachNguoiDungPhanTrang);
userRouter.get("/TimKiemNguoiDung", timKiemNguoiDung)
userRouter.get("/TimKiemNguoiDungPhanTrang", timKiemNguoiDungPhanTrang)
userRouter.delete("/XoaNguoiDung", authenticate, authorize(['QuanTri']), removeUser)

module.exports = {
    userRouter
}
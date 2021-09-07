const express = require("express");
const { layDanhSachPhim, themPhim, layDanhSachPhimPhanTrang, layDanhSachPhimTheoNgay, uploadMovieAvatar, updateMovie, removeMovie, layThongTinPhim } = require("../controller/Movie/movie.controller");
const { authenticate, authorize } = require("../middleware/auth/verify-token.middleware");
const { uploadImageSingle } = require("../middleware/upload/upload.middleware");
const { checkMovieExist } = require("../middleware/validations/checkExist.middleware");
const { Movie } = require("../models");
const movieRouter = express.Router();

movieRouter.get("/LayDanhSachPhim", layDanhSachPhim);
movieRouter.get("/LayDanhSachPhimPhanTrang", layDanhSachPhimPhanTrang);
movieRouter.get("/LayDanhSachPhimTheoNgay", layDanhSachPhimTheoNgay);
movieRouter.get("/LayThongTinPhim", layThongTinPhim);
movieRouter.post("/ThemPhim", checkMovieExist(Movie), authenticate, authorize(['QuanTri']), themPhim);
movieRouter.post("/ThemPhimUploadHinh", authenticate, uploadImageSingle(), uploadMovieAvatar);
movieRouter.post("/CapNhatPhim", authenticate, authorize(['QuanTri']), updateMovie);
movieRouter.delete("/XoaPhim", authenticate, authorize(['QuanTri']), removeMovie);


module.exports = {
    movieRouter
}
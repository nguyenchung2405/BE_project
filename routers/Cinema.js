const express = require("express");
const { layThongTinHeThongRap, layThongTinCumRapTheoHeThong } = require("../controller/Cinema/Cinema.controller");
const cinemaRouter = express.Router();

cinemaRouter.get("/LayThongTinHeThongRap", layThongTinHeThongRap);
cinemaRouter.get("/LayThongTinCumRapTheoHeThong", layThongTinCumRapTheoHeThong);

module.exports = {
    cinemaRouter
}
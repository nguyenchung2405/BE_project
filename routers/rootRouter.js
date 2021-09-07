const express = require("express");
const { cinemaRouter } = require("./Cinema");
const { movieRouter } = require("./Movie");
const { ticketRouter } = require("./Ticket");
const { userRouter } = require("./User");
const rootRouter = express.Router();

rootRouter.use("/QuanLyNguoiDung", userRouter);
rootRouter.use("/QuanLyDatVe", ticketRouter);
rootRouter.use("/QuanLyRap", cinemaRouter);
rootRouter.use("/QuanLyPhim", movieRouter);

module.exports = {
    rootRouter
}
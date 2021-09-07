const express = require("express");
const { taoLichChieu } = require("../controller/Ticket/ticket.controller");
const { authorize, authenticate } = require("../middleware/auth/verify-token.middleware");
const ticketRouter = express.Router();

ticketRouter.post("/TaoLichChieu", authenticate, authorize(['QuanTri']), taoLichChieu);

module.exports = {
    ticketRouter
}
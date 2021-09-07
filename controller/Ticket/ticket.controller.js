const { showTime, Seat, sequelize, danhSachRap, Cinema, Movie } = require("../../models");
const { Op } = require("sequelize");
const moment = require("moment");

const tenRapArr = [
    "Rạp 1",
    "Rạp 2",
    "Rạp 3",
    "Rạp 4",
    "Rạp 5",
    "Rạp 6",
    "Rạp 7",
    "Rạp 8",
    "Rạp 9",
    "Rạp 10",
];

async function createDanhSachRap() {
    try {
        const cinemaList = await Cinema.findAll();
        let length = 0;
        if (cinemaList.length > length) {
            length = cinemaList.length;
            let MaRap = 451;
            for (let i = 0; i < cinemaList.length; i++) {
                tenRapArr.forEach(async (tenRap, index) => {
                    let cinemaId = i + 1;
                    await danhSachRap.create({
                        maRap: MaRap + index,
                        tenRap,
                        cinemaId
                    })
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
};

async function createSeat(price) {
    try {
        for (let i = 1; i <= 30; i++) {
            await Seat.create({
                name: i,
                status: false,
                price,
                type: "Thường",
            })
        }
    } catch (error) {
        console.log(error);
    }
};

const datVe = async (req, res) => {
    try {

    } catch (error) {

    }
}

const taoLichChieu = async (req, res) => {
    try {
        const { maPhim, ngayChieuGioChieu, maRap, giaVe } = req.body;
        await createDanhSachRap();
        const cinema = await danhSachRap.findOne({ where: { maRap } });
        if (!cinema) {
            res.send("Rạp này không tồn tại");
        }
        const movie = await Movie.findOne({ where: { maPhim } });
        if (!movie) {
            res.send("Phim này không tồn tại");
        }
        const parseDate = moment(ngayChieuGioChieu, "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
        await showTime.create({
            startTime: parseDate,
            movieId: movie.id,
            maRap: cinema.id
        });

        await showTime.findAll();

        // const findShowTime = await showTime.findOne({
        //     where: {
        //         [Op.and]: [
        //             { startTime: parseDate },
        //             { movieId: movie.id },
        //             { cinemaId: cinema.id }
        //         ]
        //     }
        // });


        // Tạo Seat
        // createSeat(giaVe);

        // query table
        // const [response] = await sequelize.query(`
        //     select showtimes.startTime, movies.tenPhim, seats.name as "Số ghế", seats.price as "Giá vé" from be_movie.showtimes
        //     inner join be_movie.seats
        //     on showtimes.id = seats.showTimeId
        //     inner join be_movie.movies
        //     on showtimes.movieId = movies.id
        //     where showtimes.id = ${findShowTime.id}
        // `);
        res.status(200).send("Tạo lịch chiếu thành công");
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    datVe,
    taoLichChieu
}
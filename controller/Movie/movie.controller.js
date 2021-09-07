const { Movie, sequelize } = require("../../models");
const { Op } = require("sequelize");

const layDanhSachPhim = async (req, res) => {
    try {
        const { maNhom, tenPhim } = req.query;
        if (!tenPhim) {
            const movieList = await Movie.findAll({
                where: {
                    maNhom
                }
            });
            res.status(200).send(movieList);
        } else {
            const movieList = await Movie.findAll({
                where: {
                    [Op.and]: [
                        { maNhom },
                        {
                            tenPhim: {
                                [Op.like]: `%${tenPhim}%`
                            }
                        }
                    ]
                }
            });
            res.status(200).send(movieList);
        }
    } catch (error) {
        res.status(500).send(error)
    }
};

const layDanhSachPhimPhanTrang = async (req, res) => {
    try {
        const { maNhom, tenPhim, soTrang, soPhanTuTrenTrang } = req.query;
        let danhSachPhimPhanTrang = "";
        if (!tenPhim) {
            [danhSachPhimPhanTrang] = await sequelize.query(`
                select * from movies
                where movies.maNhom = "${maNhom}"
                limit ${soPhanTuTrenTrang * (soTrang - 1)}, ${soPhanTuTrenTrang};
            `)
        } else {
            [danhSachPhimPhanTrang] = await sequelize.query(`
                select * from movies
                where movies.maNhom = "${maNhom}" and movies.tenPhim like '%${tenPhim}%'
                limit ${soPhanTuTrenTrang * (soTrang - 1)}, ${soPhanTuTrenTrang};
            `)
        }
        res.status(200).send(danhSachPhimPhanTrang)
    } catch (error) {
        res.status(500).send(error)
    }
};

const layDanhSachPhimTheoNgay = async (req, res) => {
    try {
        const { maNhom, tenPhim, soTrang, soPhanTuTrenTrang, tuNgay, denNgay } = req.query;
        let danhSachPhimTheoNgay = "";
        if (!tenPhim) {
            [danhSachPhimTheoNgay] = await sequelize.query(`
                select * from movies
                where ( 
                    movies.maNhom = "${maNhom}" 
                    and movies.ngayKhoiChieu between str_to_date('${tuNgay} 00:00:00', '%d/%m/%Y %H:%i:%s') and str_to_date('${denNgay} 23:59:59', '%d/%m/%Y %H:%i:%s')
                )
                limit ${soPhanTuTrenTrang * (soTrang - 1)}, ${soPhanTuTrenTrang};
            `)
        } else {
            [danhSachPhimTheoNgay] = await sequelize.query(`
                select * from movies
                where ( 
                    movies.maNhom = "${maNhom}"
                    and movies.tenPhim like '%${tenPhim}%' 
                    and movies.ngayKhoiChieu between str_to_date('${tuNgay} 00:00:00', '%d/%m/%Y %H:%i:%s') and str_to_date('${denNgay} 23:59:59', '%d/%m/%Y %H:%i:%s')
                )
                limit ${soPhanTuTrenTrang * (soTrang - 1)}, ${soPhanTuTrenTrang};
            `)
        }
        res.status(200).send(danhSachPhimTheoNgay)
    } catch (error) {
        res.status(500).send(error)
    }
}

const themPhim = async (req, res) => {
    try {
        const { maPhim, tenPhim, biDanh, trailer, hinhAnh, moTa, maNhom, ngayKhoiChieu, danhGia } = req.body;
        const createMovie = await Movie.create({ maPhim, tenPhim, biDanh, trailer, hinhAnh, moTa, maNhom, ngayKhoiChieu, danhGia });
        res.status(200).send(createMovie);
    } catch (error) {
        res.status(500).send(error)
    }
};

const uploadMovieAvatar = async (req, res) => {
    try {
        const { file } = req;
        res.send(file);
    } catch (error) {
        res.status(500).send(error)
    }
};

const updateMovie = async (req, res) => {
    try {
        const { maPhim, tenPhim, biDanh, trailer, hinhAnh, moTa, maNhom, ngayKhoiChieu, danhGia } = req.body;
        await Movie.update({ tenPhim, biDanh, trailer, hinhAnh, moTa, maNhom, ngayKhoiChieu, danhGia }, {
            where: { maPhim }
        });
        const movieUpdated = await Movie.findOne({
            where: { maPhim }, attributes: {
                exclude: ['id', 'createdAt', 'updatedAt']
            }
        });
        if (movieUpdated == null) {
            res.send("Bộ phim này không tồn tại.")
        } else {
            res.status(200).send(movieUpdated);
        }
    } catch (error) {
        res.status(500).send(error)
    }
};

const removeMovie = async (req, res) => {
    try {
        const { maPhim } = req.query;
        const movieRemoved = await Movie.findOne({ where: { maPhim } });
        await Movie.destroy({
            where: {
                maPhim
            }
        })
        res.status(200).send({
            message: "Đã xóa thành công",
            phimDaXoa: movieRemoved
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

const layThongTinPhim = async (req, res) => {
    try {
        const { maPhim } = req.query;
        const movieDetail = await Movie.findOne({
            where: {
                maPhim
            }
        });
        movieDetail == null ? res.send("Phim này không tồn tại") : res.status(200).send(movieDetail);

    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    layDanhSachPhim,
    layDanhSachPhimPhanTrang,
    themPhim,
    layDanhSachPhimTheoNgay,
    uploadMovieAvatar,
    updateMovie,
    removeMovie,
    layThongTinPhim
}
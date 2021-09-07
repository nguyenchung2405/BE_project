const { Op } = require("sequelize");
const { User, sequelize } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getListUser = async (req, res) => {
    try {
        const { maNhom, tuKhoa } = req.query;
        let userList = "";
        if (maNhom && tuKhoa) {
            userList = await User.findAll({
                where: {
                    [Op.and]: [
                        {
                            hoTen: {
                                [Op.substring]: `${tuKhoa}`
                            }
                        },
                        { maNhom: `${maNhom}` }
                    ]
                }
            });
        } else if (maNhom) {
            userList = await User.findAll({
                where: {
                    maNhom
                }
            });
        } else if (tuKhoa) {
            userList = await User.findAll({
                where: {
                    hoTen: {
                        [Op.substring]: `${tuKhoa}`
                    }
                }
            });
        } else {
            userList = await User.findAll();
        }
        userList ? res.status(200).send(userList) : res.status(500).send("Không có dữ liệu")
    } catch (error) {
        res.status(404).send(error);
    }
};

const createUser = async (req, res) => {
    try {
        console.log(req.body)
        const { taiKhoan, matKhau, email, soDT, maNhom, maLoaiNguoiDung, hoTen } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(matKhau, salt);
        const userSignUp = await User.create({
            taiKhoan, matKhau: hashPassword, email, soDT, maNhom, maLoaiNguoiDung, hoTen
        });
        res.status(200).send(userSignUp);
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.user;
        const { matKhau, email, soDT, maNhom, hoTen } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(matKhau, salt);
        await User.update({ matKhau: hashPassword, email, soDT, maNhom, hoTen }, {
            where: {
                id
            }
        });
        const userUpdated = await User.findOne({
            where: { id },
            attributes: { exclude: ["matKhau", "createdAt", "updatedAt"] }
        })
        res.status(200).send(userUpdated);
    } catch (error) {
        res.status(500).send(error);
    }
};

const signIn = async (req, res) => {
    try {
        const { taiKhoan, matKhau } = req.body;
        const user = await User.findOne({ where: { taiKhoan } });
        if (user) {
            const isAuth = bcrypt.compareSync(matKhau, user.matKhau);
            if (isAuth) {
                const payload = {
                    id: user.id,
                    hoTen: user.hoTen,
                    maLoaiNguoiDung: user.maLoaiNguoiDung
                };
                const token = jwt.sign(payload, "ĐNC", { expiresIn: 60 * 60 * 24 });

                res.status(200).send({
                    taiKhoan: user.taiKhoan,
                    email: user.email,
                    soDT: user.soDT,
                    maNhom: user.maNhom,
                    maLoaiNguoiDung: user.maLoaiNguoiDung,
                    hoTen: user.hoTen,
                    accessToken: token
                });
            } else {
                res.send("Mật khẩu không đúng");
            }
        } else {
            res.send("Tài khoản không tồn tại.")
        }
    } catch (error) {
        res.status(500).send(error)
    }
};

const layThongTinTaiKhoan = async (req, res) => {
    try {
        const { taiKhoan } = req.body;
        const user = await User.findOne({ where: { taiKhoan } });
        user ? res.status(200).send(user) : res.status(500).send("Tài khoản không tồn tại.")
    } catch (error) {
        res.status(500).send(error);
    }
};

const layDanhSachLoaiNguoiDung = async (req, res) => {
    try {
        const [danhSachLoaiNguoiDung] = await sequelize.query(`select distinct(maLoaiNguoiDung) from users`);
        for (let maUser of danhSachLoaiNguoiDung) {
            maUser.maLoaiNguoiDung === "KhachHang" ? maUser.tenLoai = "Khách Hàng" : maUser.tenLoai = "Quản Trị"
        }
        res.status(200).send(danhSachLoaiNguoiDung)
    } catch (error) {
        res.status(500).send(error);
    }
};

const layDanhSachNguoiDungPhanTrang = async (req, res) => {
    try {
        const { maNhom, tuKhoa, soTrang, soPhanTuTrenTrang } = req.query;
        let phanTrang;
        if (!maNhom && !soTrang && !soPhanTuTrenTrang && !tuKhoa) {
            [phanTrang] = await sequelize.query(`
                select * from users
                where maNhom = 'GP01'
                limit 20
            `)
        } else if (!tuKhoa) {
            [phanTrang] = await sequelize.query(`
                select * from users
                where maNhom = '${maNhom}'
                limit ${soPhanTuTrenTrang * (soTrang - 1)},${soPhanTuTrenTrang}
            `)
        } else {
            [phanTrang] = await sequelize.query(`
                select * from users
                where hoTen like '%${tuKhoa}%' and maNhom = '${maNhom}'
                limit ${soPhanTuTrenTrang * (soTrang - 1)},${soPhanTuTrenTrang}
            `)
        }
        res.status(200).send(phanTrang);
    } catch (error) {
        res.status(500).send(error);
    }
};

const timKiemNguoiDung = async (req, res) => {
    try {
        const { maNhom, tuKhoa } = req.query;
        let timKiemList;
        if (!tuKhoa) {
            [timKiemList] = await sequelize.query(`
                select taiKhoan, matKhau, email,soDT,maLoaiNguoiDung,hoTen from users
                where maNhom = '${maNhom}'
            `)
        } else {
            [timKiemList] = await sequelize.query(`
                select taiKhoan, matKhau, email,soDT,maLoaiNguoiDung,hoTen from users
                where maNhom = '${maNhom}' and hoTen like '%${tuKhoa}%'
            `)
        }
        res.status(200).send(timKiemList);
    } catch (error) {
        res.status(500).send(error);
    }
};

const timKiemNguoiDungPhanTrang = async (req, res) => {
    try {
        const { maNhom, tuKhoa, soTrang, soPhanTuTrenTrang } = req.query;
        let timKiemList;
        if (!tuKhoa) {
            [timKiemList] = await sequelize.query(`
                select taiKhoan, matKhau, email,soDT,maLoaiNguoiDung,hoTen,maNhom from users
                where maNhom = '${maNhom}'
                limit ${soPhanTuTrenTrang * (soTrang - 1)},${soPhanTuTrenTrang}
            `)
        } else {
            [timKiemList] = await sequelize.query(`
                select taiKhoan, matKhau, email,soDT,maLoaiNguoiDung,hoTen,maNhom from users
                where maNhom = '${maNhom}' and hoTen like '%${tuKhoa}%'
                limit ${soPhanTuTrenTrang * (soTrang - 1)},${soPhanTuTrenTrang}
            `)
        }
        res.status(200).send(timKiemList);
    } catch (error) {
        res.status(500).send(error)
    }
};

const removeUser = async (req, res) => {
    try {
        const { taiKhoan } = req.query;
        const userNeedToRemove = await User.findOne({
            where: {
                taiKhoan
            }
        });
        await User.destroy({
            where: {
                taiKhoan
            }
        });
        let message = {
            message: "Xóa tài khoản thành công",
            userRemoved: userNeedToRemove
        };
        res.status(200).send(message);
    } catch (error) {
        res.status(500).send(error)
    }
};

module.exports = {
    getListUser,
    createUser,
    updateUser,
    signIn,
    layThongTinTaiKhoan,
    layDanhSachLoaiNguoiDung,
    layDanhSachNguoiDungPhanTrang,
    timKiemNguoiDung,
    timKiemNguoiDungPhanTrang,
    removeUser
}
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
    try {
        const accessToken = req.header("accessToken");
        if (!accessToken) {
            res.send("Bạn chưa đăng nhập")
        }
        const decoded = await jwt.verify(accessToken, "ĐNC");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(500).send(error)
    }
};

const authorize = (roleList) => (req, res, next) => {
    try {
        const { user } = req;
        if (roleList.findIndex(role => role === user.maLoaiNguoiDung) !== -1) {
            next()
        } else {
            res.status(403).send("Bạn không có quyền để thực hiện thao tác này");
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    authenticate,
    authorize
}
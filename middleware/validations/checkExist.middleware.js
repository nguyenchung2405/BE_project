const checkUserExistByEmail = (Model) => async (req, res, next) => {
    try {
        const { email } = req.body;
        const userExisted = await Model.findOne({ where: { email } });
        if (userExisted == null) {
            next()
        } else {
            res.status(404).send("Tài khoản này đã tồn tại.")
        }
    } catch (error) {
        res.status(404).send(error);
    }
};

const checkExistById = (Model) => async (req, res, next) => {
    try {
        const { id } = req.user;
        const userExisted = await Model.findOne({ where: { id } });
        if (userExisted) {
            next();
        } else {
            res.status(404).send("Not Found");
        }
    } catch (error) {
        res.status(404).send(error);
    }
}

const checkMovieExist = (Model) => async (req, res, next) => {
    try {
        const { maPhim } = req.body;
        const movieExisted = await Model.findOne({
            where: {
                maPhim
            }
        })
        movieExisted ? res.send("Bộ phim này đã tồn tại.") : next()
    } catch (error) {
        res.status(404).send(error);
    }
}

module.exports = {
    checkUserExistByEmail,
    checkExistById,
    checkMovieExist
}
const { Cineplex, Cinema, sequelize } = require("../../models");

const layThongTinHeThongRap = async (req, res) => {
    try {
        const { maHeThongRap } = req.query;
        if (!maHeThongRap) {
            const cineplexList = await Cineplex.findAll();
            res.status(200).send(cineplexList);
        }
        const cineplexList = await Cineplex.findAll({
            where: {
                maHeThongRap
            }
        });
        if (cineplexList.length == 0) {
            res.send(`Hệ thống rạp ${maHeThongRap} không tồn tại.`)
        } else {
            res.status(200).send(cineplexList);
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const layThongTinCumRapTheoHeThong = async (req, res) => {
    try {
        const { maHeThongRap } = req.query;
        if (!maHeThongRap) {
            res.status(500).send("Mã hệ thống rạp không tồn tại.");
        }
        const list = sequelize.query(`
            select cinemas.name, cinemas.address from cinemas
            left join cineplexes
            on cinemas.cineplexId = cineplexes.id
            where cineplexes.maHeThongRap = "${maHeThongRap}"
        `)
        res.status(200).send(list);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    layThongTinHeThongRap,
    layThongTinCumRapTheoHeThong
}
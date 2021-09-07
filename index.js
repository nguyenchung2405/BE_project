const express = require("express");
const { rootRouter } = require("./routers/rootRouter");
const app = express();
const path = require("path");


app.use(express.json());

//setup static file
const pathPublicDirectory = path.join(__dirname, "/public");
app.use("/public", express.static(pathPublicDirectory));

// router
app.use("/api", rootRouter);


const port = 2405;
app.listen(port, () => {
    console.log(`App is running in ${port}`);
})
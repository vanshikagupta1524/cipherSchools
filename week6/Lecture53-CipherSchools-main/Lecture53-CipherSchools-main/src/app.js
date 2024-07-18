require("./app-mongoose");
const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/user-route");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRoute);

PORT = 8080;

app.listen(PORT, () => {
    console.log(`Library app backend is runing on port: ${PORT}`);
});
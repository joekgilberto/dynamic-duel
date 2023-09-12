require("dotenv").config();

require('./config/database.js')

const { PORT } = process.env;

const express = require("express");

const app = express();

const battlesRouter = require('./routes/battles')
const likesRouter = require("./routes/likes.js");
const commentsRouter = require("./routes/comments.js");
const authRouter = require("./routes/auth.js");
const userBattlesRouter = require("./routes/userBattles.js");


const cors = require("cors")
const morgan = require("morgan")

app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use(cors());
app.use(morgan("dev"));

app.use('/battles', battlesRouter)
app.use("/likes", likesRouter)
app.use("/comments", commentsRouter)
app.use("/auth", authRouter)
app.use("/userbattles", userBattlesRouter)

app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));


const express = require("express")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const path = require("path")
const { logger } = require("./middleware/logEvents")

const db = require("./utils/Database")

const Webuntis = require("./utils/WebUntis")
const webuntis = new Webuntis(db)

webuntis.auto_fetcher(10)

const app = express()
const PORT = 3001

app.use(logger)
app.use(express.json())

app.use(express.static(path.join(__dirname, "../client/build")))

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

app.use(cors(corsOptions))

app.use("/api/data", require("./routes/DataRouter"))

app.get("/api", (req, res) => {
	res.send({ message: "Successful response." })
})

app.listen(PORT, () => console.log(`webuntis is listening on port ${PORT}.`))

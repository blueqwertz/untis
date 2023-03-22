const express = require("express")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const { logger } = require("./middleware/logEvents")

const db = require("./utils/Database")

const Webuntis = require("./utils/WebUntis")
const webuntis = new Webuntis(db)

webuntis.auto_fetcher(10)

const app = express()
const PORT = 3001

app.use(cors(corsOptions))
app.use(logger)

app.use("/data", require("./routes/DataRouter"))

app.get("/", (req, res) => {
	res.send({ message: "Successful response." })
})

app.listen(PORT, () => console.log(`webuntis is listening on port ${PORT}.`))

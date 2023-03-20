const express = require("express")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const { logger } = require("./middleware/logEvents")

const db = require("./utils/Database")

const Webuntis = require("./utils/WebUntis")
const webuntis = new Webuntis(db)

// webuntis.auto_fetcher(4)

// const fetcher = () => {
// 	setTimeout(async () => {
// 		await webuntis.fetch_week(0)
// 		fetcher()
// 	}, 1 * 1000)
// }

// fetcher()

const app = express()
const PORT = 3001

app.use(cors(corsOptions))
app.use(logger)

app.use("/data", require("./routes/data"))

app.get("/", (req, res) => {
	res.send({ message: "Successful response." })
})

app.listen(PORT, () => console.log(`webuntis is listening on port ${PORT}.`))

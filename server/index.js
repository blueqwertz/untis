const express = require("express")
const path = require("path")
const { logger } = require("./middleware/logEvents")

const db = require("./utils/Database")

const Webuntis = require("./utils/WebUntis")
const webuntis = new Webuntis(db)

// async function fetchWeeksSequentially(i) {
// 	if (i >= 52) {
// 		return
// 	}
// 	await webuntis.fetch_week(i)
// 	setTimeout(() => {
// 		fetchWeeksSequentially(i + 1)
// 	}, 500)
// }

// fetchWeeksSequentially(0)

webuntis.auto_fetcher(10)

const app = express()
const PORT = 3001

app.use(logger)
app.use(express.json())

app.use(express.static(path.join(__dirname, "../client/build")))

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

app.use("/api/data", require("./routes/DataRouter"))

app.post("/api", (req, res) => {
	res.send({ message: "Successful response." })
})

app.listen(PORT, () => console.log(`webuntis is listening on port ${PORT}.`))

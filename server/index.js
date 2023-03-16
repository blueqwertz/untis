const express = require("express")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")

const app = express()
const PORT = 3001

app.use(cors(corsOptions))

app.use("/list", require("./routes/list"))

app.get("/", (req, res) => {
	res.send({ message: "Successful response." })
})

app.listen(PORT, () => console.log(`Example app is listening on port ${PORT}.`))

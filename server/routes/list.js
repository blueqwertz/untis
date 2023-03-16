const express = require("express")
const router = express.Router()
const fs = require("fs")

router.get("/", async (req, res) => {
	fs.readFile("./data/teacher.json", (err, data) => {
		if (err) {
			console.error(err)
			res.status(500).send("Error reading file")
			return
		}
		res.send(JSON.parse(data))
	})
})

module.exports = router

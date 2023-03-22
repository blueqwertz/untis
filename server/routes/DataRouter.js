const express = require("express")
const router = express.Router()
const db = require("../utils/Database")
const Webuntis = require("../utils/WebUntis")
const wu = new Webuntis(db)

function getMonday(d) {
	d = new Date(d)
	var day = d.getDay(),
		diff = d.getDate() - day + (day == 0 ? -6 : 1)
	return new Date(d.setDate(diff)).toISOString().slice(0, 10)
}

function getFriday(d) {
	d = new Date(d)
	var day = d.getDay(),
		diff = d.getDate() + (5 - day) + (day == 0 ? -6 : 1)
	return new Date(d.setDate(diff)).toISOString().slice(0, 10)
}

router.post("/group/:id", async (req, res) => {
	const id = req.params.id
	let date = req.body?.date || new Date().toISOString()
	let startDate = getMonday(new Date(date))
	let endDate = getFriday(new Date(date))
	await wu.db.beginCommit()
	await wu.fetch_group_id(id, startDate)
	await wu.db.submitCommit()
	const holidays = await db.getHolidaysByDate(startDate, endDate)
	const classes = await db.getClassesByGroupAndDateRange(id, startDate, endDate)
	res.send({ classes, holidays })
})

router.post("/teacher/:id", async (req, res) => {
	const id = req.params?.id
	let date = req.body?.date || new Date().toISOString()
	let startDate = getMonday(new Date(date))
	let endDate = getFriday(new Date(date))
	const holidays = await db.getHolidaysByDate(startDate, endDate)
	const classes = await db.getClassesByTeacherAndDateRange(id, startDate, endDate)
	res.send({ classes, holidays })
})

router.post("/room/:id", async (req, res) => {
	const id = req.params.id
	let date = req.body?.date || new Date().toISOString()
	let startDate = getMonday(new Date(date))
	let endDate = getFriday(new Date(date))
	const holidays = await db.getHolidaysByDate(startDate, endDate)
	const classes = await db.getClassesByRoomAndDateRange(id, startDate, endDate)
	res.send({ classes, holidays })
})

router.post("")

router.post("/list", async (req, res) => {
	const data = await db.getRoomsTeachersGroups()
	res.send(data)
})

module.exports = router

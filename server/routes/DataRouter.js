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

router.post("/holidays", async (req, res) => {
	const id = req?.params?.id
	var { date } = req?.body
	if (!date) {
		date = new Date()
	}
	let startDate = getMonday(new Date(date))
	let endDate = getFriday(new Date(date))
	const holidays = await db.getHolidaysByDate(startDate, endDate)
	res.send(holidays)
})

router.post("/group/:id", async (req, res) => {
	const id = req?.params?.id
	var { date } = req?.body
	if (!date) {
		date = new Date()
	}
	let startDate = getMonday(new Date(date))
	let endDate = getFriday(new Date(date))
	const classes = await db.getClassesByGroupAndDateRange(id, startDate, endDate)
	res.send(classes)
})

router.post("/teacher/:id", async (req, res) => {
	const id = req?.params?.id
	var { date } = req?.body
	if (!date) {
		date = new Date()
	}
	let startDate = getMonday(new Date(date))
	let endDate = getFriday(new Date(date))
	const classes = await db.getClassesByTeacherAndDateRange(id, startDate, endDate)
	res.send(classes)
})

router.post("/room/:id", async (req, res) => {
	const id = req?.params?.id
	var { date } = req?.body
	if (!date) {
		date = new Date()
	}
	let startDate = getMonday(new Date(date))
	let endDate = getFriday(new Date(date))
	const classes = await db.getClassesByRoomAndDateRange(id, startDate, endDate)
	res.send(classes)
})

router.post("/weathericons", async (req, res) => {
	const data = {
		0: "https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/raw/master/V2_icons/small/png/10000_clear_small%402x.png",
		1: "https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/raw/master/V2_icons/small/png/10000_clear_small%402x.png",
		2: "https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/raw/master/V2_icons/small/png/11000_mostly_clear_small%402x.png",
		3: "https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/raw/master/V2_icons/small/png/10010_cloudy_small%402x.png",
		45: "https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/raw/master/V2_icons/small/png/20000_fog_small%402x.png",
		48: "https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/raw/master/V2_icons/small/png/20000_fog_small%402x.png",
		51: "https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/raw/master/V2_icons/small/png/40000_drizzle_small%402x.png",
		53: "https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/raw/master/V2_icons/small/png/40000_drizzle_small%402x.png",
		55: "https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/raw/master/V2_icons/small/png/40000_drizzle_small%402x.png",
		56: "https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/raw/master/V2_icons/small/png/60000_freezing_rain_drizzle_small%402x.png",
		57: "https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/raw/master/V2_icons/small/png/60000_freezing_rain_drizzle_small%402x.png",
		61: "https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/raw/master/V2_icons/small/png/42000_rain_light_small%402x.png",
		63: "https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/raw/master/V2_icons/small/png/40010_rain_small%402x.png",
		65: "https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/raw/master/V2_icons/small/png/42010_rain_heavy_small%402x.png",
		66: "https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/raw/master/V2_icons/small/png/60010_freezing_rain_small%402x.png",
		67: "https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/raw/master/V2_icons/small/png/60010_freezing_rain_small%402x.png",
		71: "https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/raw/master/V2_icons/small/png/51000_snow_light_small%402x.png",
		73: "https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/raw/master/V2_icons/small/png/50000_snow_small%402x.png",
		75: "https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/raw/master/V2_icons/small/png/51010_snow_heavy_small%402x.png",
		77: "https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/raw/master/V2_icons/small/png/50010_flurries_small%402x.png",
		80: "https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/raw/master/V2_icons/small/png/42000_rain_light_small%402x.png",
		81: "https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/raw/master/V2_icons/small/png/40010_rain_small%402x.png",
		82: "https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/raw/master/V2_icons/small/png/42010_rain_heavy_small%402x.png",
		85: "https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/raw/master/V2_icons/small/png/50000_snow_small%402x.png",
		86: "https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/raw/master/V2_icons/small/png/50000_snow_small%402x.png",
		95: "https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/raw/master/V2_icons/small/png/80000_tstorm_small%402x.png",
		96: "https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/raw/master/V2_icons/small/png/80000_tstorm_small%402x.png",
		99: "https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/raw/master/V2_icons/small/png/80000_tstorm_small%402x.png",
	}
	res.send(data)
})

router.post("/list", async (req, res) => {
	const data = await db.getRoomsTeachersGroups()
	res.send(data)
})

module.exports = router

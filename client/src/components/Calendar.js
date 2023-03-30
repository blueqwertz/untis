import React, { useEffect, useState } from "react"
import axios from "../api/axios"
import Class from "./Class"
import Loader from "./Loader"
import SideBar from "./SideBar"
import BackButton from "./BackButton"
import WeatherDisplay from "./WeatherDisplay"

function Calendar({ dataOptions, setDataOptions, editMode, setEditMode }) {
	const [searchData, setSearchData] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [isUpdating, setIsUpdating] = useState(false)
	const [data, setDataContent] = useState({})
	const [lastFetch, setLastFetch] = useState(undefined)
	const [fetchNotifier, setFetchNotifier] = useState(Math.random())
	const [hidden, setHidden] = useState(localStorage.getItem("hidden") ? JSON.parse(localStorage.getItem("hidden")) : {})
	const [errMsg, setErrMsg] = useState("")
	const [focus, setFocus] = useState(0)
	const [weatherData, setWeatherData] = useState([])
	const [weatherIcons, setWeatherIcons] = useState([])
	const weatherCodes = {}

	Date.prototype.formatLastFetch = function () {
		let now = new Date()
		if (now - this < 24 * 60 * 60 * 1000) {
			let hours = this.getHours().toString().padStart(2, "0")
			let minutes = this.getMinutes().toString().padStart(2, "0")
			return `${hours}:${minutes}`
		} else {
			let day = this.getDate().toString().padStart(2, "0")
			let month = (this.getMonth() + 1).toString().padStart(2, "0")
			let hours = this.getHours().toString().padStart(2, "0")
			let minutes = this.getMinutes().toString().padStart(2, "0")
			return `${day}.${month} ${hours}:${minutes}`
		}
	}

	const fetchWeather = async () => {
		try {
			const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=48.12&longitude=16.27&daily=weathercode,temperature_2m_max&current_weather=true&forecast_days=7&timezone=Europe%2FBerlin")
			const weatherIcons = await axios.post("/data/weathericons")
			const data = await response.json()
			const result = []

			for (let date of data.daily.time) {
				result.push({ date: date })
			}
			for (let index in data.daily.temperature_2m_max) {
				result[index]["temp_max"] = Math.round(data.daily.temperature_2m_max[index])
			}
			for (let index in data.daily.temperature_2m_max) {
				result[index]["code"] = data.daily.weathercode[index]
			}
			result[0] = {
				date: new Date().toISOString().slice(0, 10),
				temp_max: Math.round(data["current_weather"]["temperature"]),
				code: data["current_weather"]["weathercode"],
			}
			setWeatherData(result)
			setWeatherIcons(weatherIcons.data)
		} catch (err) {
			return {}
		}
	}

	const getCalendarData = async (doSetLoading) => {
		function getWeekDates(date) {
			const result = []
			const day = date.getDay()
			const diff = date.getDate() - day + (day === 0 ? -6 : 1)
			const startOfWeek = new Date(date.setDate(diff))
			for (let i = 0; i < 5; i++) {
				const currentDate = new Date(startOfWeek)
				currentDate.setDate(startOfWeek.getDate() + i)
				const year = currentDate.getFullYear()
				const month = currentDate.getMonth() + 1
				const day = currentDate.getDate()
				const formattedMonth = month.toString().padStart(2, "0")
				const formattedDay = day.toString().padStart(2, "0")
				result.push(`${year}${formattedMonth}${formattedDay}`)
			}
			return result
		}

		function compareToNextClass(a, b) {
			if (!b) {
				return false
			}
			if (!(a.length == b.length)) {
				return false
			}
			for (let el of a) {
				const next = b.find((el2) => el2.subjectID == el.subjectID)
				if (!next) {
					return false
				}
				if (!(el.room == next.room && el.teacher == next.teacher && el.group == next.group)) {
					return false
				}
			}
			return true
		}

		async function formatData(events, holidays) {
			let timeLookUpTable = {
				755: 0,
				850: 1,
				940: 2,
				955: 3,
				1050: 4,
				1145: 5,
				1240: 6,
				1330: 7,
				1400: 8,
				1450: 9,
				1550: 10,
				1640: 11,
			}
			const grid = {}
			const weekDates = getWeekDates(new Date(dataOptions.date))
			weekDates.forEach((key) => {
				if (!grid[key]) {
					grid[key] = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: [], 13: [] }
				}
			})
			events.forEach((event) => {
				try {
					const date = event.date.replaceAll("-", "")
					const hour = timeLookUpTable[event.startTime]
					if (!grid[date]) {
						grid[date] = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: [], 13: [] }
					}
					if (!grid[date][hour]) {
						grid[date][hour] = new Array(10)
					}
					grid[date][hour].push({
						status: event.state,
						date: date,
						hour: hour,
						start: event.startTime,
						end: event.endTime,
						teacher: event.teacher,
						room: event.room,
						subject: event.subject,
						group: event.groupName,
						id: event.id,
						info: event.info,
						groupIDS: event.groupIDS,
						subjectID: event.subjectID,
						doubleClass: false,
					})
				} catch (err) {
					console.log(err)
				}
			})
			weekDates.forEach((day) => {
				try {
					const year = day.toString().slice(0, 4)
					const month = parseInt(day.toString().slice(4, 6)) - 1
					const weekday = day.toString().slice(6, 8)

					const date = new Date(year, month, weekday)
					date.setHours(12)

					holidays.forEach((holiday) => {
						if (new Date(holiday.startDate).getTime() < date.getTime() && new Date(new Date(holiday.endDate).setHours(13)).getTime() > date.getTime()) {
							holiday = {
								...holiday,
								type: "holiday",
							}
							grid[day] = holiday
						}
					})
				} catch (err) {
					console.log(err)
				}
			})
			// for (let date in grid) {
			// 	for (let hour in grid[date]) {
			// 		const doubleClass = compareToNextClass(grid[date][hour], grid[date][parseInt(hour) + 1])
			// 		if (doubleClass) {
			// 			for (let hourclass in grid[date][hour]) {
			// 				grid[date][hour][hourclass].doubleClass = true
			// 				grid[date][parseInt(hour) + 1] = []
			// 			}
			// 		}
			// 		console.log(doubleClass)
			// 	}
			// }
			return grid
		}

		localStorage.setItem("dataOptions", JSON.stringify(dataOptions))

		if (doSetLoading) {
			setIsLoading(true)
		}
		try {
			var date = new Date(dataOptions.date)
			date.setDate(date.getDate() + 2)

			const [classRequest, holidayRequest] = await Promise.all([axios.post(`/data/${dataOptions.type}/${dataOptions.id}`, { date: date.toISOString().slice(0, 10) }), axios.post(`/data/holidays`, { date: date.toISOString().slice(0, 10) })])

			const result = await formatData(classRequest.data, holidayRequest.data)
			setErrMsg("")
			await setDataContent(result)
			await localStorage.setItem("data", JSON.stringify({ lastFetch: new Date(), data: result }))
			setIsLoading(false)
			setIsUpdating(false)
			setLastFetch(new Date())
		} catch (err) {
			setErrMsg("Server wurde nicht erreicht.")
			localStorage.removeItem("dataOptions")

			if (localStorage.getItem("data")) {
				const data = await JSON.parse(localStorage.getItem("data"))
				const result = data.data
				const lastFetch = data.lastFetch
				await setDataContent(result)
				setLastFetch(new Date(lastFetch))
				setIsLoading(false)
			}

			setTimeout(() => {
				getCalendarData(false)
			}, 5000)
		}
	}

	const getListData = async () => {
		try {
			const response = await axios.post("/data/list")
			setSearchData([
				...response.data.rooms.map((entry) => {
					return {
						type: "Raum",
						...entry,
					}
				}),
				...response.data.teachers.map((entry) => {
					return {
						type: "Lehrer",
						...entry,
					}
				}),
				...response.data.groups.map((entry) => {
					return {
						type: "Klasse",
						...entry,
					}
				}),
			])
		} catch {
			console.log("Could not fetch data")
			setTimeout(() => {
				getListData()
			}, 5000)
		}
	}

	useEffect(() => {
		console.log(`FETCHING ${new Date(dataOptions.date).toISOString().slice(0, 10)}`)
		setIsUpdating(true)
		getCalendarData(false)
	}, [fetchNotifier])

	useEffect(() => {
		localStorage.setItem("hidden", JSON.stringify(hidden))
	}, [hidden])

	useEffect(() => {
		getCalendarData(true)
	}, [dataOptions])

	useEffect(() => {
		setInterval(() => {
			setFetchNotifier(Math.random())
		}, 15 * 1000)
		fetchWeather()
		getListData()
	}, [])

	const [dayView, setDayView] = useState(undefined)

	const formatDate = (dateInt) => {
		const year = Math.floor(dateInt / 10000)
		const month = Math.floor((dateInt % 10000) / 100)
		const day = dateInt % 100
		const date = new Date(year, month - 1, day)
		date.setHours(12)
		const weekday = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"][date.getDay()]

		return { weekday, date: (day < 10 ? "0" + day : day) + "." + (month < 10 ? "0" + month : month), dateObj: date }
	}

	return isLoading ? (
		<>
			<div className="w-full flex items-center justify-center grow">
				<Loader size={14} fill={"fill-gray-800 dark:fill-slate-400"} visible={true} />
			</div>
		</>
	) : (
		<>
			<div className="flex grow">
				<SideBar />
				<div className="flex flex-1 gap-[1px] pr-3 pb-8 ">
					{/* DAY */}
					{Object.keys(data).map((day, index) => {
						const formDate = formatDate(day)
						const weather = weatherData.find((event) => event.date == formDate.dateObj.toISOString().slice(0, 10))
						return (
							<div key={day} className={`flex-1 grid grid-rows-[46px_repeat(2,1fr)_18px_repeat(4,1fr)_36px_repeat(4,1fr)] sm:grid-rows-[36px_repeat(2,1fr)_18px_repeat(4,1fr)_36px_repeat(4,1fr)] gap-[1px] ${dayView !== undefined && dayView !== index ? "hidden" : ""}`}>
								<div
									className={`w-full py-1 flex gap-3 justify-center items-center text-xs md:text-sm cursor-pointer select-none @container ${formDate.dateObj.toISOString().slice(0, 10) == new Date().toISOString().slice(0, 10) ? "bg-[#bcc0c4] dark:bg-slate-600" : ""}`}
									onClick={async () => {
										await setDayView(dayView != undefined ? undefined : index)
										document.body.setAttribute("data-day-view", dayView == undefined)
									}}
								>
									<div className="flex flex-col sm:flex-row items-center justify-around sm:gap-2">
										<div className="font-semibold">{formDate.weekday}</div>
										<div className="font-light">{formDate.date}</div>
									</div>
									<WeatherDisplay weather={weather} weatherIcons={weatherIcons} />
								</div>
								{/* HOUR */}
								{data[day].type == "holiday" ? (
									<div className="flex-1 row-start-2 row-end-[14] bg-gray-400 dark:bg-slate-700 flex justify-center items-center overflow-hidden">
										<div className="-rotate-90">{data[day].name}</div>
									</div>
								) : (
									Object.keys(data[day]).map((hour) => {
										return (
											<div key={hour} data-hour className={`flex-1 flex gap-[1px] bg-slate-300 dark:bg-slate-800 text-gray-900`}>
												{/* CLASS */}
												{Object.keys(data[day][hour])
													.sort((a, b) => {
														const aHidden = hidden[dataOptions.id]?.includes(data[day][hour][a].subjectID)
														const bHidden = hidden[dataOptions.id]?.includes(data[day][hour][b].subjectID)
														return aHidden - bHidden
													})
													.map((hourclass) => {
														const classHidden = hidden[dataOptions.id]?.includes(data[day][hour][hourclass].subjectID)
														return (
															<Class
																key={data[day][hour][hourclass].id}
																curHour={data[day][hour][hourclass]}
																compareData={{ thisHour: data[day][hour], nextHour: data[day][[parseInt(hour) + 1]] }}
																classHidden={classHidden}
																editMode={editMode}
																setHidden={setHidden}
																dataOptions={dataOptions}
																setDataOptions={setDataOptions}
																focus={focus}
																setFocus={setFocus}
																infoData={searchData}
															/>
														)
													})}
											</div>
										)
									})
								)}
							</div>
						)
					})}
				</div>
			</div>
			<BackButton dataOptions={dataOptions} setDataOptions={setDataOptions} />
			<div className="fixed left-1/2 bottom-0 px-4 py-2 text-gray-500 text-xs cursor-pointer select-none -translate-x-1/2 flex justify-between w-full box-border pointer-events-none">
				<a className="mr-2 pointer-events-auto" href="https://bgpd.at" target={"_blank"}>
					©bgpd.at
				</a>
				<span>{errMsg}</span>
				<div className="flex items-center justify-center gap-1">
					<Loader size={3} fill={"fill-gray-800 dark:fill-slate-400"} visible={isUpdating} />
					<span>Aktualisiert {lastFetch.formatLastFetch()}</span>
				</div>
			</div>
		</>
	)
}

export default Calendar

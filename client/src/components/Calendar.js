import React, { useEffect, useState } from "react"
import axios from "../api/axios"
import { MoonLoader } from "react-spinners"
import Class from "./Class"

function Calendar({ dataOptions, setDataOptions, editMode }) {
	const [searchData, setSearchData] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	const [data, setDataContent] = useState({})
	const [holidays, setHolidays] = useState({})
	const [lastFetch, setLastFetch] = useState(undefined)
	const [hidden, setHidden] = useState(localStorage.getItem("hidden") ? JSON.parse(localStorage.getItem("hidden")) : {})

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

	useEffect(() => {
		const getData = async (doSetLoading) => {
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

			async function formatData(events, holidays) {
				let timeLookUpTable = {
					755: 0,
					850: 1,
					955: 2,
					1050: 3,
					1145: 4,
					1240: 5,
					1330: 5,
					1400: 6,
					1450: 7,
					1550: 8,
					1640: 9,
				}
				const grid = {}
				const weekDates = getWeekDates(new Date(dataOptions.date))
				weekDates.forEach((key) => {
					if (!grid[key]) {
						grid[key] = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [] }
					}
				})
				events.forEach((event) => {
					try {
						const date = event.date.replaceAll("-", "")
						const hour = timeLookUpTable[event.startTime]
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
				return grid
			}

			localStorage.setItem("dataOptions", JSON.stringify(dataOptions))

			if (doSetLoading) {
				await setIsLoading(true)
			}
			try {
				const response = await axios.get(`/data/${dataOptions.type}/${dataOptions.id}?date="${new Date(dataOptions.date).toISOString().slice(0, 10)}"`)
				const result = await formatData(response.data.classes, response.data.holidays)
				await setDataContent(result)
				await localStorage.setItem("data", JSON.stringify({ lastFetch: new Date(), data: result }))
				setIsLoading(false)
				setLastFetch(new Date())
			} catch (err) {
				if (localStorage.getItem("data")) {
					const data = await JSON.parse(localStorage.getItem("data"))
					const result = data.data
					const lastFetch = data.lastFetch
					await setDataContent(result)
					setLastFetch(new Date(lastFetch))
					setIsLoading(false)
				}
			}
		}

		getData(true)
	}, [dataOptions])

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await axios.get("/data/list")
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
			}
		}
		getData()
	}, [])

	const [dayView, setDayView] = useState(undefined)

	const formatDate = (dateInt) => {
		const year = Math.floor(dateInt / 10000)
		const month = Math.floor((dateInt % 10000) / 100)
		const day = dateInt % 100
		const date = new Date(year, month - 1, day)
		const weekday = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"][date.getDay()]

		return { weekday, date: (day < 10 ? "0" + day : day) + "." + (month < 10 ? "0" + month : month) }
	}

	return isLoading ? (
		<>
			<div className="w-full flex items-center justify-center grow">
				<MoonLoader color="#334155" />
			</div>
		</>
	) : (
		<>
			<div className="flex grow">
				<div className="mt-[56px] sm:mt-[36px] flex flex-col px-1 text-xs sm:text-sm sm:px-2 pb-8 text-gray-400 dark:text-slate-500">
					<div className="grow flex justify-center items-center">1</div>
					<div className="grow flex justify-center items-center">2</div>
					<div className="grow flex justify-center items-center">3</div>
					<div className="grow flex justify-center items-center">4</div>
					<div className="grow flex justify-center items-center">5</div>
					<div className="grow flex justify-center items-center">6</div>
					<div className="grow flex justify-center items-center">7</div>
					<div className="grow flex justify-center items-center">8</div>
					<div className="grow flex justify-center items-center">9</div>
					<div className="grow flex justify-center items-center">10</div>
				</div>
				<div className="flex flex-1 gap-[1px] pr-3 pb-8 ">
					{/* DAY */}
					{Object.keys(data).map((day, index) => {
						const formDate = formatDate(day)
						return (
							<div key={day} className={`flex-1 grid grid-rows-[56px_repeat(10,1fr)] sm:grid-rows-[36px_repeat(10,1fr)] gap-[1px] ${dayView !== undefined && dayView !== index ? "hidden" : ""}`}>
								<div
									className="w-full py-1 flex flex-col sm:flex-row sm:gap-3 justify-center items-center text-sm md:text-base cursor-pointer select-none"
									onClick={async () => {
										await setDayView(dayView != undefined ? undefined : index)
										document.body.setAttribute("data-day-view", dayView == undefined)
									}}
								>
									<div className="font-semibold">{formDate.weekday}</div>
									<div>{formDate.date}</div>
								</div>
								{/* HOUR */}
								{data[day].type == "holiday" ? (
									<div className="flex-1 row-start-2 row-end-[12] bg-gray-400 dark:bg-slate-700 flex justify-center items-center overflow-hidden">
										<div className="-rotate-90">{data[day].name}</div>
									</div>
								) : (
									Object.keys(data[day]).map((hour) => {
										return (
											<div key={hour} data-hour className="flex-1 flex gap-[1px] bg-slate-300 dark:bg-slate-800 text-gray-900">
												{/* CLASS */}
												{Object.keys(data[day][hour]).map((hourclass) => {
													return <Class key={data[day][hour][hourclass].id} hour={data[day][hour][hourclass]} hide={hidden[dataOptions.id]?.includes(data[day][hour][hourclass].subjectID)} />
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
			<div className="fixed left-0 bottom-0 mx-4 my-2 text-gray-500 text-xs cursor-pointer select-none">
				<a className="mr-2" href="https://bgpd.at" target={"_blank"}>
					©bgpd.at
				</a>
			</div>
			<div className="fixed right-0 bottom-0 mx-4 my-2 text-gray-500 text-xs cursor-pointer select-none">Aktualisiert {lastFetch.formatLastFetch()}</div>
		</>
	)
}

export default Calendar

class Webuntis {
	constructor(db) {
		this.url = "https://neilo.webuntis.com/WebUntis/api/public/timetable/weekly/data?elementType=1&elementId=<ID>&date=<DATE>&formatId=1"
		this.db = db
		this.cookies = {
			traceId: "dc1906127e0235ddaa5077aa951803fbc950d4ed",
			schoolname: '"_YmdwZXJjaHRvbGRzZG9yZg=="',
			JSESSIONID: "B22ECDC1B10652A0072EFC85A51029F0",
		}
	}

	async fetchWithCookies(url, cookies = this.cookies) {
		try {
			const cookieHeader = Object.entries(cookies)
				.map(([key, value]) => `${key}=${value}`)
				.join("; ")
			const response = await fetch(url, {
				method: "GET",
				credentials: "include",
				headers: {
					Cookie: cookieHeader,
				},
			})
			const data = await response.json()
			return {
				status: response.status,
				statusText: response.statusText,
				headers: response.headers,
				data,
			}
		} catch (err) {
			console.log("Fetch failed:", url)
		}
	}

	async fetch_groups() {
		try {
			const response = await this.fetchWithCookies("https://neilo.webuntis.com/WebUntis/api/public/timetable/weekly/pageconfig?type=1")
			response.data.data.elements.map((group) => {
				this.db.addGroup(group.id, group.name)
			})
		} catch (err) {
			console.log(err)
		}
	}

	async fetch_group_id(id, date) {
		try {
			const response = await this.fetchWithCookies(`https://neilo.webuntis.com/WebUntis/api/public/timetable/weekly/data?elementType=1&elementId=${id}&date=${date}&formatId=1`)
			response.data.data.result.data.elements.map((info) => {
				switch (info.type) {
					case 1:
						this.db.addGroup(info.id, info.name)
						break
					case 2:
						this.db.addTeacher(info.id, info.name)
						break
					case 3:
						this.db.addSubject(info.id, info.name)
						break
					case 4:
						this.db.addRoom(info.id, info.name)
						break
				}
			})
			for (let hour of response.data.data.result.data.elementPeriods[id]) {
				const hour_info = {
					groups: [],
					teacher: 0,
					subject: 0,
					room: 0,
				}
				hour.elements.map((info) => {
					switch (info.type) {
						case 1:
							hour_info.groups.push(info.id)
							break
						case 2:
							hour_info.teacher = info.id
							break
						case 3:
							hour_info.subject = info.id
							break
						case 4:
							hour_info.room = info.id
							break
					}
				})
				const formatDate = (dateInt) => {
					function makeFull(x) {
						if (x < 10) {
							return "0" + x
						}
						return x
					}
					const year = Math.floor(dateInt / 10000)
					const month = Math.floor((dateInt % 10000) / 100)
					const day = dateInt % 100
					return `${year}-${makeFull(month)}-${makeFull(day)}`
				}
				await this.db.addClass(hour.id, hour_info.subject, hour.lessonId, hour_info.teacher, hour_info.room, hour.startTime, hour.endTime, hour_info.groups, hour_info.groups.join(","), formatDate(hour.date), hour.cellState, hour.lessonText)
			}
		} catch (err) {
			return
		}
	}

	async fetch_all(date) {
		await this.fetch_groups()
		const all_groups = await this.db.getGroups()
		await Promise.all(
			all_groups.map(async (group) => {
				await this.fetch_group_id(group.id, date)
			})
		)
	}

	async fetch_week(x) {
		await this.db.beginCommit()
		console.log("start", x)
		const currentDate = new Date()
		const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + x * 7)
		const formattedDate = targetDate.toISOString().slice(0, 10)
		await this.fetch_all(formattedDate)
		console.log("end", x)
		await this.db.submitCommit()
	}

	auto_fetcher(range) {}
}

module.exports = Webuntis

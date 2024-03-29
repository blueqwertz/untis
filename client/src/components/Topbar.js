import React, { useEffect, useState } from "react"
import SearchBar from "./SearchBar"
import { AiOutlineCalendar } from "react-icons/ai"
import { RiEditLine } from "react-icons/ri"
import { searchDictionary } from "../utils/search"
import axios from "../api/axios"
import DatePicker from "./DatePicker"
import { toast } from "react-hot-toast"

function TopBar({ dataOptions, setDataOptions, editMode, setEditMode, searchStared, setSearchStared }) {
	const [teacherData, setTeacherData] = useState({})
	const [showDatePicker, setShowDatePicker] = useState(false)

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await axios.post("/data/list")
				setTeacherData([
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

		document.addEventListener("click", (e) => {
			if (!e.target.closest("#datepicker")) {
				setShowDatePicker(false)
			}
		})
	}, [])

	return (
		<header className="p-3 pl-5 sm:pl-10 bg-gray-300 dark:bg-slate-700 font-bold flex justify-between items-center gap-5">
			<div className="text-md md:text-xl flex flex-col shrink md:flex-1">
				<div>BG/BRG</div>
				<div className="-mt-2 font-light">Perchtoldsdorf</div>
				{/* <div className="-mt-2 border-b md:border-b-2 border-b-gray-900 dark:border-b-gray-50">Perchtoldsdorf</div> */}
				{/* <div className="font-medium -mt-[1px]">Stundenplan</div> */}
			</div>
			<SearchBar searchFunction={searchDictionary} searchData={teacherData} dataOptions={dataOptions} setDataOptions={setDataOptions} searchStared={searchStared} setSearchStared={setSearchStared} />
			<div className="flex justify-end items-center gap-3 md:flex-1">
				<div className="relative" id="datepicker">
					<div
						onClick={() => {
							setShowDatePicker(!showDatePicker)
						}}
					>
						<AiOutlineCalendar className="w-6 h-6 cursor-pointer md:hidden" />
					</div>
					<div>
						<DatePicker showDatePicker={showDatePicker} dataOptions={dataOptions} setDataOptions={setDataOptions} />
					</div>
				</div>
				<div className={`${dataOptions.type === "group" ? "cursor-pointer" : "cursor-not-allowed text-gray-400"}`}>
					<RiEditLine
						className="w-6 h-6"
						onClick={() => {
							if (dataOptions.type == "group") {
								if (editMode) {
									toast.success("Einstellungen gespeichert")
								}
								setEditMode(!editMode)
							}
						}}
					/>
				</div>
			</div>
		</header>
	)
}

export default TopBar

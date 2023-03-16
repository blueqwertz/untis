import React, { useEffect, useState } from "react"
import SearchBar from "./SearchBar"
import { AiOutlineEdit } from "react-icons/ai"
import { searchDictionary } from "../utils/search"
import axios from "../api/axios"

function TopBar() {
	const [teacherData, setTeacherData] = useState({})

	useEffect(() => {
		const getData = async () => {
			const response = await axios.get("/list")
			setTeacherData(response.data)
			console.log(response)
		}
		getData()
	}, [])

	return (
		<header className="p-3 px-5 sm:px-8 bg-gray-300 dark:bg-slate-700 font-bold flex justify-between items-center gap-5">
			<div className="text-md md:text-xl flex flex-col">
				<div>BG/BRG</div>
				<div className="-mt-2">Perchtoldsdorf</div>
				{/* <div className="-mt-2 border-b md:border-b-2 border-b-gray-900 dark:border-b-gray-50">Perchtoldsdorf</div> */}
				{/* <div className="font-medium -mt-[1px]">Stundenplan</div> */}
			</div>
			<div className="flex justify-center items-center gap-5">
				<AiOutlineEdit className="w-6 h-6 cursor-pointer" />
				<SearchBar searchFunction={searchDictionary} searchData={teacherData} />
			</div>
		</header>
	)
}

export default TopBar

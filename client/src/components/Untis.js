import { useEffect, useState } from "react"
import Body from "./Body"
import TopBar from "./Topbar"
import { useParams, redirect, useNavigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"

function Untis() {
	const loadDataOptions = () => {
		const result = JSON.parse(localStorage.getItem("dataOptions"))
		result.before = {}
		result.date = new Date().toISOString().slice(0, 10)
		return result
	}

	const [dataOptions, setDataOptions] = useState(localStorage.getItem("dataOptions") ? loadDataOptions() : { id: 1810, type: "group", name: "8BD", date: new Date().toISOString().slice(0, 10), before: {}, searchFavourites: [] })
	const [editMode, setEditMode] = useState(false)
	const [searchStared, setSearchStared] = useState(localStorage.getItem("searchStar") ? JSON.parse(localStorage.getItem("searchStar")) : [])

	return (
		<>
			<Toaster position="top-left" />
			<div className="flex flex-col min-h-screen w-full dark:text-gray-50 text-gray-900">
				<TopBar dataOptions={dataOptions} setDataOptions={setDataOptions} editMode={editMode} setEditMode={setEditMode} searchStared={searchStared} setSearchStared={setSearchStared} />
				<Body dataOptions={dataOptions} setDataOptions={setDataOptions} editMode={editMode} setEditMode={setEditMode} />
			</div>
		</>
	)
}

export default Untis

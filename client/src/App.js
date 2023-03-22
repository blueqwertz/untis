import { useState } from "react"
import Body from "./components/Body"
import Footer from "./components/Footer"
import TopBar from "./components/Topbar"

function App() {
	const [dataOptions, setDataOptions] = useState(localStorage.getItem("dataOptions") ? JSON.parse(localStorage.getItem("dataOptions")) : { id: 1810, type: "group", name: "8BD", date: new Date().toISOString().slice(0, 10) })
	const [editMode, setEditMode] = useState(false)

	return (
		<div className="flex flex-col min-h-screen w-full dark:text-gray-50 text-gray-900">
			<TopBar dataOptions={dataOptions} setDataOptions={setDataOptions} editMode={editMode} setEditMode={setEditMode} />
			<Body dataOptions={dataOptions} setDataOptions={setDataOptions} editMode={editMode} setEditMode={setEditMode} />
			{/* <Footer active={active} setIsActive={setIsActive} /> */}
		</div>
	)
}

export default App

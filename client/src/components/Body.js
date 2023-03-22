import React from "react"
import Calendar from "./Calendar"

function Body({ dataOptions, setDataOptions, editMode, setEditMode }) {
	return (
		<main className="grow bg-gray-200 dark:bg-slate-900 flex flex-col lg:flex-row">
			<Calendar dataOptions={dataOptions} setDataOptions={setDataOptions} editMode={editMode} setEditMode={setEditMode} />
		</main>
	)
}

export default Body

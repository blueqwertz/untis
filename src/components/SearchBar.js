import React from "react"

function SearchBar({ searchFunction }) {
	return (
		<div className="max-w-[300px]">
			<input type="text" placeholder="Lehrer, Klasse, Raum" className="text-md font-semibold font-['Inter'] px-3 py-2 rounded-none outline-none bg-gray-200 border-2 border-gray-400 dark:bg-slate-800 dark:border-slate-500 w-full" />
		</div>
	)
}

export default SearchBar

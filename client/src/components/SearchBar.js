import React, { useEffect, useState } from "react"

function SearchBar({ searchFunction, searchData }) {
	useEffect(() => {
		document.onclick = (e) => {
			if (!e.target.closest("#searchbar")) {
				setShowOptions(false)
			}
		}
	}, [])

	const [results, setResults] = useState([])
	const [showOptions, setShowOptions] = useState(false)

	return (
		<div className="max-w-[300px] lg:w-72 relative z-10" id="searchbar">
			<input
				type="text"
				placeholder="Lehrer, Klasse, Raum"
				className="text-md font-medium shrink font-['Inter'] px-3 py-2 rounded-none outline-none bg-gray-200 border-2 border-gray-400 dark:bg-slate-800 dark:border-slate-500 w-full"
				onInput={(e) => {
					if (e.target.value.length > 1) {
						setResults(searchFunction(e.target.value, searchData))
					} else {
						setResults([])
					}
				}}
				onFocus={(e) => {
					setShowOptions(true)
					if (e.target.value.length < 3) {
						setResults([])
					}
				}}
			/>
			<div className={`absolute mt-1 top-full right-0 w-full bg-gray-400 dark:bg-slate-500 ${showOptions ? "" : "hidden"}`}>
				{results.map((result, index) => {
					console.log()
					return (
						<div key={index} className="bg-gray-200 dark:bg-slate-800 m-[2px] px-3 py-2 flex items-center justify-start gap-3 cursor-pointer">
							<img className="flex grow w-8" src={result.link} />
							<div className="flex flex-col overflow-hidden whitespace-nowrap text-ellipsis w-full shrink">
								<div className="flex overflow-hidden whitespace-nowrap text-ellipsis w-full shrink">
									<span className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis">{result.name}</span>
									<span className="font-light">,</span>
									<span className="font-light ml-[3px] whitespace-nowrap overflow-hidden text-ellipsis">{result.firstName}</span>
								</div>
								<div className="text-sm font-light text-gray-500 dark:text-slate-300">{result.type}</div>
							</div>
							<div className="font-light text-xs ml-auto shrink">[{result.shortName}]</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default SearchBar

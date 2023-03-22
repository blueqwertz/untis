import React, { useEffect, useState } from "react"
import { BiGroup } from "react-icons/bi"
import { RiDoorClosedLine } from "react-icons/ri"

function SearchBar({ searchFunction, searchData, dataOptions, setDataOptions }) {
	useEffect(() => {
		document.addEventListener("click", (e) => {
			if (!e.target.closest("#searchbar")) {
				setShowOptions(false)
			}
		})
	}, [])

	const [results, setResults] = useState([])
	const [showOptions, setShowOptions] = useState(false)
	const [searchInput, setSearch] = useState("")

	return (
		<div className="max-w-[330px] sm:w-80 relative z-10" id="searchbar">
			<input
				type="text"
				placeholder="Lehrer, Klasse, Raum"
				className="text-md font-medium shrink px-3 py-2 rounded-none outline-none bg-gray-200 border-2 border-gray-400 dark:bg-slate-800 dark:border-slate-500 w-full"
				onInput={(e) => {
					e.preventDefault()
					setSearch(e.target.value)
					setShowOptions(true)
					if (e.target.value.length > 0) {
						setResults(searchFunction(e.target.value, searchData))
					} else {
						setResults([])
					}
				}}
				onKeyUp={(e) => {
					if (e.key === "Enter") {
						if (results.length > 0) {
							setShowOptions(false)
							setSearch(results[0].name)
							setDataOptions({ ...dataOptions, id: results[0].id, type: { Klasse: "group", Lehrer: "teacher", Raum: "room" }[results[0].type], name: results[0].name })
						}
					}
				}}
				onFocus={(e) => {
					setShowOptions(true)
					setResults(searchFunction(e.target.value, searchData))
					if (e.target.value.length < 1) {
						setResults([])
					}
				}}
				value={searchInput}
				autoFocus={true}
			/>
			<div className={`absolute mt-1 top-full right-0 w-full min-w-min bg-gray-400 dark:bg-slate-500 origin-top-right transition-all ${(results.length > 0) & showOptions ? "" : "scale-90 opacity-0 pointer-events-none"}`}>
				{results.map((result, index) => {
					if (result.type == "Lehrer") {
						return (
							<div
								key={index}
								className="bg-gray-200 dark:bg-slate-800 m-[2px] px-3 py-2 flex items-center justify-start gap-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-slate-900 transition-colors"
								onClick={() => {
									setShowOptions(false)
									setSearch(result.name)
									setDataOptions({ ...dataOptions, id: result.id, type: "teacher", name: result.name })
								}}
							>
								<img className="flex grow w-8" src={result.link} />
								<div className="flex flex-col overflow-hidden whitespace-nowrap text-ellipsis w-full shrink">
									<div className="flex overflow-hidden whitespace-nowrap text-ellipsis w-full shrink leading-snug">
										<span className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">{result.lastName}</span>
										<span className="font-light">,</span>
										<span className="font-light ml-[3px] whitespace-nowrap overflow-hidden text-ellipsis">{result.firstName}</span>
									</div>
									<div className="text-sm font-light text-gray-500 dark:text-slate-300 leading-tight">{result.type}</div>
								</div>
								<div className="font-light text-sm ml-auto shrink">[{result.name}]</div>
							</div>
						)
					} else {
						return (
							<div
								key={index}
								className="bg-gray-200 dark:bg-slate-800 m-[2px] px-3 py-2 flex items-center justify-start gap-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-slate-900 transition-colors"
								onClick={() => {
									setShowOptions(false)
									setSearch(result.name)
									setDataOptions({ ...dataOptions, id: result.id, type: result.type == "Klasse" ? "group" : "room", name: result.name })
								}}
							>
								<div className="flex grow p-2 justify-center items-center rounded-full bg-gray-400 dark:bg-slate-700 text-gray-800 dark:text-gray-50">{result.type == "Klasse" ? <BiGroup /> : <RiDoorClosedLine />}</div>
								<div className="flex flex-col overflow-hidden whitespace-nowrap text-ellipsis w-full shrink">
									<div className="flex overflow-hidden whitespace-nowrap text-ellipsis w-full shrink">
										<span className="font-medium whitespace-nowrap overflow-hidden text-ellipsis leading-snug">{result.name}</span>
									</div>
									<div className="text-sm font-light text-gray-500 dark:text-slate-300 leading-tight">{result.type}</div>
								</div>
							</div>
						)
					}
				})}
			</div>
		</div>
	)
}

export default SearchBar

import React, { useEffect, useState } from "react"
import { BiGroup, BiSearch } from "react-icons/bi"
import { RiDoorClosedLine, RiStarLine, RiStarFill } from "react-icons/ri"

function SearchBar({ searchFunction, searchData, dataOptions, setDataOptions, searchStared, setSearchStared }) {
	const [results, setResults] = useState([])
	const [showOptions, setShowOptions] = useState(false)
	const [searchInput, setSearch] = useState("")
	const [searchIndex, setSearchIndex] = useState(-1)

	useEffect(() => {
		document.addEventListener("click", (e) => {
			if (!e.target.closest("#searchbar")) {
				setShowOptions(false)
			}
		})
	}, [])

	useEffect(() => {
		setSearch(dataOptions.name)
	}, [dataOptions])

	useEffect(() => {
		localStorage.setItem("searchStar", JSON.stringify(searchStared))
	}, [searchStared])

	return (
		<div className="max-w-[300px] sm:w-80 relative z-10 flex" id="searchbar">
			<input
				type="text"
				placeholder="Lehrer, Klasse, Raum"
				className="text-md font-medium shrink px-3 pr-7 cursor-text py-2 rounded-none outline-none bg-gray-200 border-2 border-gray-400 dark:bg-slate-800 dark:border-slate-500 w-full"
				onInput={(e) => {
					setSearch(e.target.value)
					setShowOptions(true)
					setSearchIndex(-1)
					if (e.target.value.length > 0) {
						setResults(searchFunction(e.target.value, searchData))
					} else {
						setResults([])
					}
				}}
				onKeyDown={async (e) => {
					if (e.key === "Enter") {
						if (results.length >= searchIndex) {
							setShowOptions(false)
							setDataOptions({ ...dataOptions, id: results[searchIndex < 0 ? 0 : searchIndex].id, type: { Klasse: "group", Lehrer: "teacher", Raum: "room" }[results[searchIndex < 0 ? 0 : searchIndex].type], name: results[searchIndex < 0 ? 0 : searchIndex].name, before: {} })
						}
					} else if (e.key == "ArrowDown") {
						e.preventDefault()
						setSearchIndex((prev) => {
							return (prev + 1) % results.length
						})
					} else if (e.key == "ArrowUp") {
						e.preventDefault()
						setSearchIndex((prev) => {
							if (prev <= 0) {
								return results.length - 1
							}
							return (prev - 1) % results.length
						})
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
			/>
			<BiSearch className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-gray-500 dark:text-slate-400" />
			<div className={`absolute mt-1 top-full right-0 w-full min-w-[230px] bg-gray-400 dark:bg-slate-500 origin-top transition-all ${(results.length > 0) & showOptions ? "" : "scale-90 opacity-0 pointer-events-none"}`}>
				{results.map((result, index) => {
					if (result.type == "Lehrer") {
						return (
							<div
								key={index}
								className={`m-[2px] pl-3 pr-1 py-2 flex items-center justify-start gap-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-slate-900 transition-colors ${index == searchIndex && results.length > 1 ? "bg-slate-300 dark:bg-slate-600" : "bg-gray-200 dark:bg-slate-800"}`}
								onClick={() => {
									setSearchIndex(-1)
									setShowOptions(false)
									setDataOptions({ ...dataOptions, id: result.id, type: "teacher", name: result.name, before: {} })
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
								{/* <div className="font-light text-lg ml-auto shrink text-gray-400 dark:text-slate-500 p-3">
									<RiStarLine />
								</div> */}
							</div>
						)
					} else {
						return (
							<div
								key={index}
								className={`m-[2px] pl-3 pr-1 py-2 flex items-center justify-start gap-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-slate-900 transition-colors ${index == searchIndex && results.length > 1 ? "bg-slate-300 dark:bg-slate-600" : "bg-gray-200 dark:bg-slate-800"}`}
								onClick={(e) => {
									setSearchIndex(-1)
									setShowOptions(false)
									setDataOptions({ ...dataOptions, id: result.id, type: result.type == "Klasse" ? "group" : "room", name: result.name, before: {} })
								}}
							>
								<div className="flex grow p-2 justify-center items-center rounded-full bg-gray-400 dark:bg-slate-700 text-gray-800 dark:text-gray-50">{result.type == "Klasse" ? <BiGroup /> : <RiDoorClosedLine />}</div>
								<div className="flex flex-col overflow-hidden whitespace-nowrap text-ellipsis w-full shrink">
									<div className="flex overflow-hidden whitespace-nowrap text-ellipsis w-full shrink">
										<span className="font-medium whitespace-nowrap overflow-hidden text-ellipsis leading-snug">{result.name}</span>
									</div>
									<div className="text-sm font-light text-gray-500 dark:text-slate-300 leading-tight">{result.type}</div>
								</div>
								{/* <div
									className="font-light text-lg ml-auto shrink text-gray-400 dark:text-slate-500 p-3 hover:"
									onClick={(e) => {
										setSearchStared((prev) => {
											if (prev.includes(result.id)) {
												return prev.filter((id) => id !== result.id)
											} else {
												return [...prev, result.id]
											}
										})
									}}
								>
									{searchStared.includes(result.id) ? <RiStarFill /> : <RiStarLine />}
								</div> */}
							</div>
						)
					}
				})}
			</div>
		</div>
	)
}

export default SearchBar

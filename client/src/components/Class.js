import React, { useCallback, useEffect, useRef, useState } from "react"
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri"
import { FaInfoCircle } from "react-icons/fa"
import { MdOutlineEditNote } from "react-icons/md"

function Class({ curHour, compareData, classHidden, editMode, setHidden, dataOptions, setDataOptions, focus, setFocus, infoData }) {
	const container = useRef(null)
	const [direction, setDirection] = useState({ dir: "right", value: "100%" })
	const teacherObj = infoData.find((entry) => entry.name == curHour.teacher)

	const addClassToHidden = async (classID, subjectID) => {
		setHidden((prevHidden) => {
			const updatedClassSubjects = [...(prevHidden[classID] || [])]
			const index = updatedClassSubjects.indexOf(subjectID)
			if (index > -1) {
				updatedClassSubjects.splice(index, 1)
			} else {
				updatedClassSubjects.push(subjectID)
			}
			return {
				...prevHidden,
				[classID]: updatedClassSubjects,
			}
		})
	}

	return (
		<>
			<div
				key={curHour.id}
				id={curHour.id}
				onClick={async (e) => {
					e.preventDefault()
					if (focus == curHour.id) {
						await setFocus(0)
						document.onclick = () => {}
					} else {
						await setFocus(curHour.id)
						document.onclick = (e) => {
							const el = document.getElementById(curHour.id)
							if (!el?.contains(e.target)) {
								setFocus(0)
							}
						}
					}
					const rect = await container.current.getBoundingClientRect()
					if (document.body.getAttribute("data-day-view") == "true" || curHour.info.length > 15) {
						if (rect.y / document.body.clientHeight > 0.4) {
							setDirection((prev) => {
								return { ...prev, dir: "bottom" }
							})
						} else {
							setDirection((prev) => {
								return { ...prev, dir: "top" }
							})
						}
					} else {
						if (rect.x / document.body.clientWidth > 0.5) {
							setDirection((prev) => {
								return { ...prev, dir: "right" }
							})
						} else {
							setDirection((prev) => {
								return { ...prev, dir: "left" }
							})
						}
					}
				}}
				ref={container}
				className={`flex-1 flex justify-center items-center cursor-pointer transition-opacity ${classHidden ? (editMode ? "opacity-60" : "hidden") : ""}`}
				data-state={curHour.status}
			>
				<div className="min-w-full min-h-full py-2 text-xs sm:text-sm flex justify-around items-center text-center flex-wrap relative">
					<div className="flex flex-col items-center h-full justify-around">
						<div className="font-semibold">{curHour.subject}</div>
						<div className="cursor-pointer relative group font-light">{curHour.teacher}</div>
					</div>
					<div className="flex flex-col items-center h-full justify-around">
						<div className="font-semibold">{curHour.room}</div>
						<div className="font-light">{curHour.group}</div>
					</div>
					{curHour.info ? (
						<div className="absolute top-0 right-0 my-[1px] mx-[2px]">
							<div>
								<FaInfoCircle className="w-[10px] text-gray-800 dark:text-slate-800" />
							</div>
						</div>
					) : (
						<></>
					)}
					{dataOptions.type == "group" ? (
						<div
							onClick={() => {
								addClassToHidden(dataOptions.id, curHour.subjectID)
							}}
							className={`absolute flex justify-center items-center top-0 right-0 text-gray-300 hover:scale-110 active:scale-105 transition-[transform] translate-x-1/3 -translate-y-1/3 z-[9] rounded-full bg-slate-600 p-1 ${editMode ? "scale-100" : "scale-0"}`}
						>
							{classHidden ? <RiEyeOffLine /> : <RiEyeLine />}
						</div>
					) : (
						<></>
					)}
					<div
						className={`rounded-md cursor-default absolute drop-shadow-xl py-1 px-3 sm:py-2 sm:px-4 bg-gray-100 dark:bg-slate-600 border border-gray-500 dark:border-slate-300 dark:text-gray-50 m-2 z-[9] transition-all text-start text-sm ${focus == curHour.id && !editMode ? "opacity-100 scale-100" : "opacity-0 pointer-events-none scale-50"}`}
						style={{ [direction.dir]: [direction.value] }}
					>
						<div className="relative flex justify-between gap-2 text-base sm:text-lg">
							<span className="font-semibold whitespace-nowrap">{curHour.subject}</span>
							<span
								className="font-normal text-gray-500 dark:text-slate-300 whitespace-nowrap hover:underline cursor-pointer"
								onClick={() => {
									const roomObj = infoData.find((el) => el.name == curHour.room)
									if (!roomObj) {
										return
									}
									setDataOptions((prev) => {
										return { ...prev, type: "room", id: roomObj.id, name: roomObj.name, before: prev }
									})
								}}
							>
								{curHour.room}
							</span>
						</div>
						<div className="flex gap-2 italic text-gray-500 dark:text-slate-300">
							<span>
								{Math.floor(curHour.start / 100)}:{(curHour.start % 100).toString().padStart(2, "0")}
							</span>
							<span>-</span>
							<span>
								{Math.floor(curHour.end / 100)}:{(curHour.end % 100).toString().padStart(2, "0")}
							</span>
						</div>
						<div
							className="mt-1 pb-1 flex gap-2 hover:underline cursor-pointer"
							onClick={() => {
								if (!teacherObj) {
									return
								}
								setDataOptions((prev) => {
									return { ...prev, type: "teacher", id: teacherObj.id, name: teacherObj.name, before: prev }
								})
							}}
						>
							<div className="w-6 h-6">
								<img src={teacherObj?.link || "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/empty.png"} />
							</div>
							<span className="whitespace-nowrap font-light flex items-center">
								<span>{teacherObj?.lastName || curHour.teacher}</span>
							</span>
						</div>
						{curHour.info.length > 0 ? (
							<div className="flex flex-col gap-1 items-start pt-1">
								<div className="">
									<FaInfoCircle className="w-3 h-3" />
								</div>
								<span className="line-clamp-3 hover:line-clamp-none">{curHour.info}</span>
							</div>
						) : (
							<></>
						)}
						<div
							className={`absolute h-[10px] w-[10px] border-gray-500 bg-gray-100 dark:bg-slate-600 dark:border-slate-300 transform rotate-45 ${
								{ right: "top-1/2 left-full -translate-y-1/2 -translate-x-[4.5px] border-r border-t", left: "top-1/2 right-full translate-x-[4.5px] -translate-y-1/2 border-l border-b", top: "bottom-full translate-y-[4.5px] -translate-x-1/2 left-1/2 border-l border-t", bottom: "top-full -translate-x-1/2 -translate-y-[4.5px] border-b border-r left-1/2" }[direction.dir]
							}`}
						></div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Class

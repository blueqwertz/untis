import React, { useRef, useState } from "react"
import { RiEyeLine, RiEyeOffLine, RiLink } from "react-icons/ri"
import { FaInfoCircle } from "react-icons/fa"

function Class({ curHour, compareData, classHidden, editMode, setHidden, dataOptions, setDataOptions, focus, setFocus, infoData }) {
	const container = useRef(null)
	const [direction, setDirection] = useState({ dir: "right-bottom", pointPx: 10 })
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
					if (editMode) {
						addClassToHidden(dataOptions.id, curHour.subjectID)
					} else {
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
					}
					const rect = await container.current.getBoundingClientRect()
					if (!(document.body.getAttribute("data-day-view") == "true")) {
						setDirection((prev) => {
							return { ...prev, pointPx: Math.round(rect.height / 2) }
						})
						if (rect.x / document.body.clientWidth > 0.3 && rect.x / document.body.clientWidth < 0.7 && teacherObj?.lastName.length >= 9) {
							if (rect.y / document.body.clientHeight > 0.4) {
								setDirection((prev) => {
									return { ...prev, dir: "center-top" }
								})
							} else {
								setDirection((prev) => {
									return { ...prev, dir: "center-bottom" }
								})
							}
						} else if (rect.x / document.body.clientWidth > 0.5) {
							if (rect.y / document.body.clientHeight > 0.4) {
								setDirection((prev) => {
									return { ...prev, dir: "left-top" }
								})
							} else {
								setDirection((prev) => {
									return { ...prev, dir: "left-bottom" }
								})
							}
						} else {
							if (rect.y / document.body.clientHeight > 0.4) {
								setDirection((prev) => {
									return { ...prev, dir: "right-top" }
								})
							} else {
								setDirection((prev) => {
									return { ...prev, dir: "right-bottom" }
								})
							}
						}
					} else {
						if (rect.y / document.body.clientHeight > 0.4) {
							setDirection((prev) => {
								return { ...prev, dir: "center-top" }
							})
						} else {
							setDirection((prev) => {
								return { ...prev, dir: "center-bottom" }
							})
						}
					}
				}}
				ref={container}
				className={`flex-1 flex justify-center items-center cursor-pointer select-none transition-opacity ${classHidden ? (editMode ? "opacity-60" : "hidden") : ""}`}
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
							className={`absolute flex justify-center items-center top-0 right-0 text-gray-300 hover:scale-110 active:scale-105 transition-[transform] translate-x-1/3 -translate-y-1/3 rounded-full bg-slate-600 z-10 p-1 ${editMode ? "scale-100" : "scale-0"}`}
						>
							{classHidden ? <RiEyeOffLine /> : <RiEyeLine />}
						</div>
					) : (
						<></>
					)}
					{/* TOOLTIP */}
					<div
						className={`max-w-[300px] rounded-md cursor-default absolute drop-shadow-xl py-2 px-3 sm:py-2 sm:px-4 
					bg-gray-100 dark:bg-slate-600 border border-gray-500 dark:border-slate-300 dark:text-gray-50 mx-2 z-10 transition-all text-start text-sm md:text-base ${focus == curHour.id ? "opacity-100 scale-100" : "opacity-0 pointer-events-none scale-0"} ${
							{
								"right-top": "left-full bottom-0",
								"right-bottom": "left-full top-0",
								"left-top": "right-full bottom-0",
								"left-bottom": "right-full top-0",
								"center-top": "bottom-full mx-0 my-2",
								"center-bottom": "top-full mx-0 my-2",
							}[direction.dir]
						}`}
					>
						<div className="relative flex justify-between gap-2 text-sm sm:text-base">
							<span className="font-semibold whitespace-nowrap">{curHour.subject}</span>
							<div
								className="font-normal text-gray-500 dark:text-slate-300 whitespace-nowrap hover:underline cursor-pointer flex gap-[2px] items-center justify-center"
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
								<div className="whitespace-nowrap font-light flex items-center gap-[2px] group">
									<span className="transition-[transform] translate-x-3 group-hover:translate-x-0">{curHour.room}</span>
									<div className="overflow-hidden w-3 h-3">
										<RiLink className="text-xs text-gray-500 dark:text-gray-300 w-full h-full -translate-x-full transition-[transform] group-hover:translate-x-0" />
									</div>
								</div>
							</div>
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
							className="mt-1 pb-1 flex gap-2 hover:underline cursor-pointer group"
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
							<div className="whitespace-nowrap font-light flex items-center gap-[2px]">
								<div className="overflow-hidden w-3 h-3">
									<RiLink className="text-xs text-gray-500 dark:text-gray-300 w-full h-full translate-x-full transition-[transform] group-hover:translate-x-0" />
								</div>
								<span className="transition-[transform] -translate-x-3 group-hover:translate-x-0">{teacherObj?.lastName || curHour.teacher}</span>
							</div>
						</div>
						<div className="flex flex-wrap border-t border-gray-400 pt-1 mt-1">
							{curHour.groupIDS.split(",").map((item, index) => {
								return (
									<div
										key={index}
										className="pr-1 cursor-pointer hover:underline font-light flex items-center justify-center"
										onClick={(e) => {
											setDataOptions((prev) => {
												return { ...prev, type: "group", id: item, name: infoData.find((entry) => entry.id == item)?.name, before: prev }
											})
										}}
									>
										<div className="whitespace-nowrap font-light flex items-center gap-[2px] group">
											<span>
												{infoData.find((entry) => entry.id == item)?.name || item}
												{index < curHour.groupIDS.split(",").length - 1 ? "," : ""}
											</span>
										</div>
									</div>
								)
							})}
						</div>
						{curHour.info.length > 0 ? (
							<div className="flex flex-col gap-1 items-start border-t border-gray-400 mt-1 pt-1">
								<span className="line-clamp-3 hover:line-clamp-none">{curHour.info}</span>
							</div>
						) : (
							<></>
						)}
						<div
							className={`absolute h-[10px] w-[10px] border-gray-500 bg-gray-100 dark:bg-slate-600 transition-colors dark:border-slate-300 transform rotate-45 ${
								{
									"left-top": `left-full translate-y-1/2 -translate-x-[4.5px] border-r border-t`,
									"left-bottom": `left-full -translate-y-1/2 -translate-x-[4.5px] border-r border-t`,
									"right-top": `right-full translate-x-[4.5px] translate-y-1/2 border-l border-b`,
									"right-bottom": `right-full translate-x-[4.5px] -translate-y-1/2 border-l border-b`,
									"center-bottom": `right-1/2 bottom-full translate-x-1/2 translate-y-[4.5px] border-l border-t`,
									"center-top": `right-1/2 top-full translate-x-1/2 -translate-y-[4.5px] border-r border-b`,
								}[direction.dir]
							}`}
							style={{
								top: [
									{
										"left-top": ``,
										"left-bottom": `${direction.pointPx}px`,
										"right-top": ``,
										"right-bottom": `${direction.pointPx}px`,
									}[direction.dir],
								][0],
								bottom: [
									{
										"left-top": `${direction.pointPx}px`,
										"left-bottom": ``,
										"right-top": `${direction.pointPx}px`,
										"right-bottom": ``,
									}[direction.dir],
								][0],
							}}
						></div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Class

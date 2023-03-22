import React, { useCallback, useEffect, useRef, useState } from "react"
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri"
import { FaInfoCircle } from "react-icons/fa"

function Class({ curHour, classHidden, editMode, setHidden, dataOptions, focus, setFocus, infoData }) {
	const container = useRef(null)
	const [direction, setDirection] = useState({ x: "right", y: "top" })
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
				onClick={async () => {
					if (focus == curHour.id) {
						setFocus(0)
					} else {
						setFocus(curHour.id)
					}
					const rect = await container.current.getBoundingClientRect()
					console.log(rect.x)
					if (rect.x > 200) {
						setDirection((prev) => {
							return { ...prev, x: "right" }
						})
					} else {
						setDirection((prev) => {
							return { ...prev, x: "left" }
						})
					}
				}}
				ref={container}
				className={`flex-1 flex justify-center items-center cursor-pointer transition-opacity ${classHidden ? (editMode ? "opacity-60" : "hidden") : ""}`}
				data-state={curHour.status}
			>
				<div className="w-full h-full text-xs sm:text-sm flex justify-around items-center text-center flex-wrap relative">
					<div className="flex flex-col justify-center items-center">
						<div className="font-semibold">{curHour.subject}</div>
						<div className="cursor-pointer relative group font-light">{curHour.teacher}</div>
					</div>
					<div className="flex flex-col justify-center items-center">
						<div className="font-semibold">{curHour.room}</div>
						<div className="whitespace-nowrap overflow-hidden text-ellipsis font-light">{curHour.group}</div>
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
					<div className={`rounded-md absolute drop-shadow-xl py-3 px-5 bg-gray-100 dark:bg-slate-600 dark:text-gray-50 ${direction.x}-full ${direction.y}-0 mx-1 mt-[2px] z-[9] transition-all text-start ${focus == curHour.id ? "opacity-100 scale-100" : "opacity-0 pointer-events-none scale-50"}`}>
						<div className="text-base flex gap-2">
							<span className="font-semibold">{curHour.subject}</span>
							<span className="font-normal text-gray-400">{curHour.room}</span>
						</div>
						<div>
							<span className="whitespace-nowrap font-light">{infoData.find((entry) => entry.name == curHour.teacher)?.lastName || curHour.teacher}</span>
						</div>
						<span className="">{curHour.info.slice(0, 100)}</span>
						<div className={`absolute transition-all h-3 w-3 bg-gray-100 dark:bg-slate-600 transform top-5 rotate-45 ${direction.x == "right" ? "-right-1" : "-left-1"}`}></div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Class

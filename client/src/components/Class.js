import React, { useState } from "react"
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri"

function Class({ curHour, classHidden, editMode, setHidden, dataOptions }) {
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
			<div key={curHour.id} className={`flex-1 flex justify-center items-center cursor-pointer transition-opacity ${classHidden ? (editMode ? "opacity-60" : "hidden") : ""}`} data-state={curHour.status}>
				<div className="w-full h-full text-xs sm:text-sm flex justify-around items-center text-center flex-wrap relative">
					<div className="flex flex-col justify-center items-center">
						<div className="font-semibold">{curHour.subject}</div>
						<div className="cursor-pointer relative group font-light">{curHour.teacher}</div>
					</div>
					<div className="flex flex-col justify-center items-center">
						<div className="font-semibold">{curHour.room}</div>
						<div className="whitespace-nowrap overflow-hidden text-ellipsis font-light">{curHour.group}</div>
					</div>
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
				</div>
			</div>
		</>
	)
}

export default Class

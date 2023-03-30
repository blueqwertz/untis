import React from "react"
import { RiArrowLeftLine } from "react-icons/ri"

function BackButton({ dataOptions, setDataOptions }) {
	return dataOptions.before && Object.keys(dataOptions.before) != 0 ? (
		<div
			className="w-11 h-11 fixed left-10 sm:left-12 bottom-10 opacity-70 hover:opacity-100 flex flex-col items-center justify-center bg-gray-400 dark:bg-slate-700 border-2 dark:border-slate-500 rounded-full cursor-pointer hover:scale-110 active:scale-100 transition-[transform_opacity] text-gray-50 dark:text-slate-200"
			onClick={() => {
				setDataOptions(dataOptions.before)
			}}
		>
			<RiArrowLeftLine />
			<span className="text-[10px]">{dataOptions.before.name}</span>
		</div>
	) : (
		<></>
	)
}

export default BackButton

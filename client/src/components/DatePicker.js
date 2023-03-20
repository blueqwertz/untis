import React from "react"
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri"

function DatePicker({ showDatePicker, dataOptions, setDataOptions }) {
	function getMonday(d) {
		d = new Date(d)
		var day = d.getDay(),
			diff = d.getDate() - day + (day == 0 ? -6 : 1)
		var monday = new Date(d.setDate(diff))
		return `${monday.getDate()}.${monday.getMonth() + 1}`
	}

	function getFriday(d) {
		d = new Date(d)
		var day = d.getDay(),
			diff = d.getDate() + (4 - day) + (day == 0 ? -6 : 1)
		var friday = new Date(d.setDate(diff))
		return `${friday.getDate()}.${friday.getMonth() + 1}`
	}

	return (
		<div className={`font-medium absolute top-full right-1/2 px-3 py-2 pb-1 mt-1 z-[11] bg-gray-200 border-2 border-gray-400 dark:bg-slate-800 dark:border-slate-500 flex flex-col gap-1 items-center origin-top transition-all translate-x-1/2 ${showDatePicker ? "" : "opacity-0 scale-90 pointer-events-none"}`}>
			<div className="flex gap-2 items-center justify-center">
				<div
					className="hover:cursor-pointer"
					onClick={() => {
						const newDate = new Date(dataOptions.date)
						newDate.setHours(12)
						newDate.setDate(newDate.getDate() - 7)
						setDataOptions({ ...dataOptions, date: newDate.toISOString().slice(0, 10) })
					}}
				>
					<RiArrowLeftLine />
				</div>
				<div className="whitespace-nowrap w-[95px] text-center">
					{getMonday(new Date(dataOptions.date))} - {getFriday(new Date(dataOptions.date))}
				</div>
				<div
					className="hover:cursor-pointer"
					onClick={() => {
						const newDate = new Date(dataOptions.date)
						newDate.setHours(12)
						newDate.setDate(newDate.getDate() + 7)
						setDataOptions({ ...dataOptions, date: newDate.toISOString().slice(0, 10) })
					}}
				>
					<RiArrowRightLine />
				</div>
			</div>
			<div
				className="cursor-pointer border-2 rounded px-2 border-gray-400 text-gray-800 hover:border-gray-600 dark:border-slate-700 dark:text-gray-50 dark:hover:border-slate-500 transition-colors"
				onClick={() => {
					if (dataOptions.date != new Date().toISOString().slice(0, 10)) {
						setDataOptions({ ...dataOptions, date: new Date().toISOString().slice(0, 10) })
					}
				}}
			>
				Heute
			</div>
		</div>
	)
}

export default DatePicker

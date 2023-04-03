import React from "react"
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri"
import { MdOutlineUpdate } from "react-icons/md"

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
		<div
			className={`font-medium absolute md:relative top-full right-1/2 px-3 py-2 pb-2 md:p-0 mt-3 md:mt-0 z-[11] bg-gray-200 border-2 border-gray-400 dark:bg-slate-800 dark:border-slate-500 md:bg-transparent md:border-none flex flex-col md:flex-row-reverse gap-1 md:gap-3 items-center origin-top transition-[transform,opacity] translate-x-1/2 sm:right-0 sm:translate-x-0 ${
				showDatePicker ? "" : "opacity-0 scale-90 pointer-events-none md:opacity-100 md:scale-100 md:pointer-events-auto"
			} select-none`}
		>
			<div className="flex gap-1 items-center justify-center">
				<div
					className="hover:cursor-pointer w-[20px] h-[20px] p-1 box-content rounded-full hover:bg-gray-200 hover:dark:bg-slate-600 transition-colors"
					onClick={() => {
						const newDate = new Date(dataOptions.date)
						newDate.setHours(12)
						newDate.setDate(newDate.getDate() - 7)
						setDataOptions({ ...dataOptions, date: newDate.toISOString().slice(0, 10) })
					}}
				>
					<RiArrowLeftLine className="w-full h-full" />
				</div>
				<div className="whitespace-nowrap w-[95px] text-center">
					{getMonday(new Date(dataOptions.date))} - {getFriday(new Date(dataOptions.date))}
				</div>
				<div
					className="hover:cursor-pointer w-[20px] h-[20px] p-1 box-content rounded-full hover:bg-gray-200 hover:dark:bg-slate-600 transition-colors"
					onClick={() => {
						const newDate = new Date(dataOptions.date)
						newDate.setHours(12)
						newDate.setDate(newDate.getDate() + 7)
						setDataOptions({ ...dataOptions, date: newDate.toISOString().slice(0, 10) })
					}}
				>
					<RiArrowRightLine className="w-full h-full" />
				</div>
			</div>
			<div
				className="cursor-pointer border-2 w-auto h-auto rounded px-3 py-1 md:rounded-full md:p-1 md:w-[20px] md:h-[20px] lg:w-auto lg:h-auto lg:rounded lg:px-3 box-content border-gray-400 text-gray-800 hover:border-gray-600 dark:border-slate-700 md:dark:border-slate-600 dark:text-gray-50 dark:hover:border-slate-400 transition-colors"
				onClick={() => {
					if (dataOptions.date != new Date().toISOString().slice(0, 10)) {
						setDataOptions({ ...dataOptions, date: new Date().toISOString().slice(0, 10) })
					}
				}}
			>
				<span className="md:hidden lg:block">Heute</span>
				<MdOutlineUpdate className="w-full h-full hidden md:block lg:hidden" />
			</div>
		</div>
	)
}

export default DatePicker

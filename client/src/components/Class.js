import React from "react"

function Class({ hour, hide }) {
	return (
		<div className={`flex-1 flex justify-center items-center ${hide ? "hidden" : ""}`} data-state={hour.status}>
			<div className="w-full h-full text-sm flex justify-around items-center text-center flex-wrap">
				<div className="flex flex-col justify-center items-center">
					<div className="italic font-semibold">{hour.subject}</div>
					<div className="hover:underline cursor-pointer relative group font-light">{hour.teacher}</div>
				</div>
				<div className="flex flex-col justify-center items-center">
					<div className="font-semibold">{hour.room}</div>
					<div className="w-14 whitespace-nowrap overflow-hidden text-ellipsis font-light">{hour.group}</div>
				</div>
			</div>
		</div>
	)
}

export default Class

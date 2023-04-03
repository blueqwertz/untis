import React from "react"

function Holiday({ holidayName }) {
	return (
		<div className="flex-1 row-start-2 row-end-[14] bg-gray-400 dark:bg-slate-700 flex justify-center items-center overflow-hidden">
			<div className="-rotate-90">{holidayName}</div>
		</div>
	)
}

export default Holiday

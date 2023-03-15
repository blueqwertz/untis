import React from "react"

function TopBar() {
	return (
		<header className="p-3 sm:px-6 bg-gray-300 dark:bg-slate-700 font-bold flex">
			<div className="text-md md:text-xl flex flex-col">
				<div>BG/BRG</div>
				<div className="-mt-2 border-b md:border-b-2 border-b-gray-900 dark:border-b-gray-50">Perchtoldsdorf</div>
				<div className="font-medium -mt-[1px]">Stundenplan</div>
			</div>
		</header>
	)
}

export default TopBar

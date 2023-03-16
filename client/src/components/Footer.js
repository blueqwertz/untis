import React from "react"
import { BsPersonVideo3, BsDoorClosed } from "react-icons/bs"
import { RiGroupLine } from "react-icons/ri"

function Footer({ active, setIsActive }) {
	const options = ["Lehrer", "Klassen", "Räume"]
	const optionsIcons = {
		Lehrer: <BsPersonVideo3 />,
		Klassen: <RiGroupLine />,
		Räume: <BsDoorClosed />,
	}

	return (
		<footer className="h-14 sm:h-14 md:h-16 bg-gray-300 dark:bg-slate-700 flex">
			<div className="flex gap-10 md:gap-16 lg:gap-32 justify-center grow">
				{options.map((option) => {
					return (
						<div
							key={option}
							onClick={() => {
								setIsActive(option)
							}}
							className={`flex flex-col justify-center items-center text-lg cursor-pointer select-none ${option === active ? "" : "text-gray-500 dark:text-slate-400"}`}
						>
							{optionsIcons[option]}
							<span className={`text-xs md:text-sm mt-1`}>{option}</span>
						</div>
					)
				})}
			</div>
		</footer>
	)
}

export default Footer

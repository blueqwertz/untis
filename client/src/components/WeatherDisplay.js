import React from "react"

function WeatherDisplay({ weather, weatherIcons }) {
	return weather ? (
		<div className={`text-xxs gap-1 hidden @3xs:flex justify-center items-center text-gray-500 dark:text-slate-400`}>
			<span>{weather?.temp_max}°C</span>
			<img className="w-3 h-3 drop-shadow-weather dark:drop-shadow-none" src={weatherIcons[weather?.code]} />
		</div>
	) : (
		<></>
	)
}

export default WeatherDisplay

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	safelist: ["left-full", "right-full", "bottom-full", "top-full"],
	theme: {
		extend: {
			colors: {
				"timetable-orange": "#e8a748",
				"timetable-purple": "#b48ec2",
				"timetable-cancel": "#b2b3b4",
				"timetable-free": "#d8dbe2",
				"timetable-exam": "#87ceeb",
			},
			fontSize: {
				xxxs: "9px",
				xxs: "11px",
			},
			containers: {
				"3xs": "7rem",
				"2xs": "8rem",
				"1xs": "12rem",
			},
			dropShadow: {
				weather: "0px 0px 7px rgba(0, 0, 0, 0.4)",
			},
		},
	},
	plugins: [require("@tailwindcss/container-queries")],
}

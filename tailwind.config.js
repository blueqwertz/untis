/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"timetable-orange": "#e8a748",
				"timetable-purple": "#b48ec2",
				"timetable-cancel": "#b2b3b4",
				"timetable-free": "#d8dbe2",
				"timetable-exam": "#87ceeb",
			},
		},
	},
	plugins: [],
}

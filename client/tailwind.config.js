/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	safelist: ["left-full", "right-full", "bottom-full", "top-full", "animate-slide-left", "animate-slide-right", "w-12", "h-12"],
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
			keyframes: {
				"slide-in-left": {
					"0%": {
						opacity: "20%",
						transform: "translateX(-10%)",
					},
					"20%": {
						transform: "translateX(-10%)",
					},
					"100%": {
						transform: "translateX(0)",
					},
				},
				"slide-in-right": {
					"0%": {
						opacity: "20%",
						transform: "translateX(10%)",
					},
					"20%": {
						transform: "translateX(10%)",
					},
					"100%": {
						transform: "translateX(0)",
					},
				},
			},
			animation: {
				"slide-left": "slide-in-left 0.2s",
				"slide-right": "slide-in-right 0.2s",
			},
		},
	},
	plugins: [require("@tailwindcss/container-queries")],
}

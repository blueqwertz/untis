import { useState } from "react"
import Body from "./components/Body"
import Footer from "./components/Footer"
import TopBar from "./components/Topbar"

function App() {
	const [active, setIsActive] = useState("Klassen")
	return (
		<div className="flex flex-col min-h-screen w-full font-['Inter'] dark:text-gray-50 text-gray-900">
			<TopBar />
			<Body />
			<Footer active={active} setIsActive={setIsActive} />
		</div>
	)
}

export default App

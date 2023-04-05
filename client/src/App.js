import { BrowserRouter, Route, Routes } from "react-router-dom"
import Untis from "./components/Untis"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/:type/:id" element={<Untis />} />
				<Route path="*" element={<Untis />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App

import Home from "./Pages/Home";
import Payout from "./Pages/Payout";
import { Global } from "./Styles/stitches.config";
import { Route, Routes } from "react-router-dom";

export default function App() {
	Global();
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/existingcontracts" element={<Payout />} />
			</Routes>
		</>
	);
}

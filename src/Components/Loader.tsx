import type { RootState } from "../Redux/store";
import { useSelector } from "react-redux";
import { LoaderPos } from "../Styles/LoaderPos";

export default function Loader() {
	const { showLoader }: any = useSelector(
		(state: RootState) => state.showLoader
	);

	return (
		<LoaderPos id={showLoader ? "on" : "off"}>
			<div className="loader"></div>
		</LoaderPos>
	);
}

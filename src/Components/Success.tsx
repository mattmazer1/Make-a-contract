import { styled } from "../Styles/stitches.config";
import { SuccessMes } from "../Styles/Notify";
import type { RootState } from "../Redux/store";
import { useSelector } from "react-redux";

const Container = styled("div", {
	position: "relative",
	display: "flex",
	justifyContent: "center",
});

export default function Success() {
	const { showSuccess }: any = useSelector(
		(state: RootState) => state.showSuccess
	);
	return (
		<Container>
			<SuccessMes id={showSuccess ? "on" : "off"}>Success!</SuccessMes>
		</Container>
	);
}

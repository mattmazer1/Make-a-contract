import { styled } from "../Styles/stitches.config";
import { ErrorMes } from "../Styles/Notify";
import type { RootState } from "../Redux/store";
import { useSelector } from "react-redux";

const Container = styled("div", {
	position: "relative",
	display: "flex",
	justifyContent: "center",
});

export default function ErrorP() {
	const { showError }: any = useSelector((state: RootState) => state.showError);
	return (
		<Container>
			<ErrorMes id={showError ? "on" : "off"}>
				Oops there was an error!
			</ErrorMes>
		</Container>
	);
}

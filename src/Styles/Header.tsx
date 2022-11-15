import { styled } from "./stitches.config";

export const Header = styled("h1", {
	fontSize: "1.5rem",
	fontWeight: "bold",
	marginTop: "5rem",
	marginLeft: "1rem",
	marginRight: "1rem",
	textAlign: "center",

	"@sm": {
		fontSize: "2rem",
	},
});

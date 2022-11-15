import { styled } from "./stitches.config";

export const Buttons = styled("button", {
	backgroundColor: "$orange",
	borderWidth: "0px",
	paddingBottom: ".3rem",
	paddingTop: ".3rem",
	paddingLeft: ".6rem",
	paddingRight: ".6rem",
	"&:active": {
		transform: "translateY(3px)",
	},
	"&:hover": {
		backgroundColor: "$hoverOrange",
		cursor: "pointer",
	},
	variants: {
		Var: {
			nav: {
				position: "absolute",
				right: "0",
				marginRight: "1rem",
				width: "7rem",
				fontSize: ".7rem",

				"@sm": {
					fontSize: "1rem",
					width: "10rem",
				},
			},
			card: {
				fontSize: ".8rem",

				"@sm": {
					fontSize: "1.3rem",
				},
			},
			buyCard: {
				width: "7rem",
				fontSize: ".8rem",

				"@sm": {
					width: "10rem",
					fontSize: "1.3rem",
				},
			},
		},
	},
});

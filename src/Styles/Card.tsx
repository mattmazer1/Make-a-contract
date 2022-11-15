import { styled } from "./stitches.config";

export const Card = styled("div", {
	variants: {
		Var: {
			block: {
				display: "block",
				position: "absolute",
				marginTop: "10rem",
				padding: "1.5rem",
				borderRadius: "0.5rem",
				backgroundColor: "#4824AF",
				width: "14rem",

				"@sm": {
					marginTop: "12rem",
					width: "20rem",
				},
			},

			div1: {
				display: "flex",
				flexDirection: "column",
			},

			div2: {
				flexWrap: "wrap",
				display: "flex",
				justifyContent: "center",
				marginTop: "1.25rem",
			},

			pdiv2: {
				display: "flex",
				justifyContent: "center",
				marginTop: ".1rem",
			},

			pdiv3: {
				justifyContent: "center",
				marginTop: ".1rem",
				fontSize: ".85rem",
				textAlign: "center",
				marginLeft: "1.5rem",
				marginRight: "1.5rem",
				wordWrap: "break-word",

				"@sm": {
					marginLeft: "2rem",
					marginRight: "2rem",
				},
			},

			div3: {
				display: "flex",
				justifyContent: "center",
			},

			div4: {
				textAlign: "center",
				wordWrap: "break-word",
			},

			buttonFund: {
				display: "flex",
				justifyContent: "center",
				marginTop: "1.5rem",
				marginBottom: "1rem",
			},

			payout: {
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				marginTop: "6rem",
			},
		},
	},
});

export const Input = styled("input", {
	display: "block",
	width: "12rem",
	paddingLeft: "0.75rem",
	paddingRight: "0.75rem",
	paddingTop: "0.375rem",
	paddingBottom: "0.375rem",
	fontSize: ".7rem",
	lineHeight: "1.5rem",
	fontWeight: "400",
	color: "Gray",
	backgroundColor: "White",
	borderWidth: "1px",
	borderColor: "White",
	borderStyle: "solid",
	borderRadius: "0.25rem",

	"@sm": {
		width: "16rem",
		fontSize: "1rem",
	},
});

export const TextArea = styled("textarea", {
	display: "block",
	width: "12rem",
	height: "11rem",
	paddingLeft: "0.75rem",
	paddingRight: "0.75rem",
	paddingTop: "0.375rem",
	paddingBottom: "0.375rem",
	fontSize: ".7rem",
	lineHeight: "1.5rem",
	fontWeight: "400",
	color: "Gray",
	backgroundColor: "White",
	borderWidth: "1px",
	borderColor: "White",
	borderStyle: "solid",
	borderRadius: "0.25rem",
	resize: "none",

	"@sm": {
		width: "16rem",
		fontSize: "1rem",
		height: "14rem",
	},
});

export const Label = styled("div", {
	position: "absolute",
	zIndex: "1",
	marginLeft: "8.5rem",
	marginTop: "9.5rem",
	width: "7rem",
	height: ".5rem",
	paddingLeft: "0.75rem",
	paddingRight: "0.75rem",
	paddingTop: "0.2rem",
	paddingBottom: "0.1rem",
	fontSize: ".5rem",
	color: "White",
	textAlign: "center",
	backgroundColor: "$orange",
	borderWidth: "1px",
	borderColor: "$orange",
	borderStyle: "solid",
	borderRadius: ".7rem .7rem 0 0",

	"@sm": {
		width: "9.5rem",
		fontSize: ".7rem",
		height: "1rem",
		paddingTop: "0.375rem",
		marginLeft: "12rem",
		marginTop: "11rem",
	},
});

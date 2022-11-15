import { createStitches } from "@stitches/react";

export const { styled, globalCss, css } = createStitches({
	theme: {
		colors: {
			orange: "#F08436",
			hoverOrange: "#b8662a",
		},
	},
	media: {
		sm: "(min-width: 640px)",
		md: "(min-width: 768px)",
		lg: "(min-width: 1024px)",
	},
});

export const Global = globalCss({
	body: {
		backgroundColor: "#171619",
	},
	"*": {
		color: "White",
		fontFamily: "sans-serif",
	},
});

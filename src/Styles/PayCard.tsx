import { styled } from "./stitches.config";

export const Header1 = styled("h1", "h2", "h3", {
	variants: {
		Var: {
			h: {
				fontSize: "1.3rem",
				textAlign: "center",

				"@sm": {
					fontSize: "1.5rem",
				},
			},
		},
	},
});

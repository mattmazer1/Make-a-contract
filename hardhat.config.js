require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
	solidity: "0.8.17",
	networks: {
		goerli: {
			url: process.env.REACT_APP_RPC_PROVIDER,
			accounts: [process.env.REACT_APP_PRIVATE_KEY],
		},
	},
	etherscan: {
		apiKey: process.env.REACT_APP_ETHERSCAN_KEY,
	},
};

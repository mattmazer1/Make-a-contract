const hre = require("hardhat");
const ethers = require("ethers");

async function main() {
	const serviceContract = await hre.ethers.getContractFactory(
		"serviceContract"
	);
	const _serviceContract = await serviceContract.deploy();

	await _serviceContract.deployed();

	console.log(`Contract deployed to ${_serviceContract.address}`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});

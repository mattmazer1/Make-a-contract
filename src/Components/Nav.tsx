import { useState, useEffect, useLayoutEffect } from "react";
import type { RootState } from "../Redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ethers } from "ethers";
import { Buttons } from "../Styles/Buttons";
import { styled } from "../Styles/stitches.config";
import { ABI } from "../ABI";
import { setLoggedIn } from "../Redux/LoggedIn";
import { setWalletAddress } from "../Redux/walletAddress";
import { setShowError } from "../Redux/ShowError";

const Container = styled("div", {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	marginTop: "2rem",
});

export const contractAddress: string =
	"0x9305c7C4E6e51201e44eBf8CeE76d7fc02529A6a";

export let provider = window.ethereum
	? new ethers.providers.Web3Provider(window.ethereum)
	: new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_PROVIDER);

export let signer: any = provider.getSigner();

export let contract: any = new ethers.Contract(contractAddress, ABI, signer);

export default function Nav() {
	const { walletAddress }: any = useSelector(
		(state: RootState) => state.walletAddress
	);
	const dispatch = useDispatch();
	const [buttonText, setButtonText] = useState<string>("");

	const connectNetwork = async () => {
		const chainId = 5; //goerli
		if (window.ethereum.networkVersion !== chainId) {
			await window.ethereum.request({
				method: "wallet_switchEthereumChain",
				params: [{ chainId: "0x5" }],
			});
		}
	};

	const connectWallet = async (): Promise<any> => {
		try {
			if (window.ethereum) {
				await provider.send("eth_requestAccounts", []);

				connectNetwork();

				window.ethereum.on("accountsChanged", function () {
					window.location.reload();
				});

				window.ethereum.on("networkChanged", function () {
					window.location.reload();
				});
			} else {
				setButtonText("Connect wallet");
			}
		} catch (e: any) {
			console.log(e.message);
			dispatch(setShowError(true));
			const err = setTimeout(() => {
				dispatch(setShowError(false));
			}, 1000);

			return () => clearTimeout(err);
		}
	};

	const persistRender = async (): Promise<any> => {
		try {
			const accounts = await provider.listAccounts();
			if (accounts.length > 0) {
				setButtonText("Connected");
				dispatch(setLoggedIn(true));
				connectNetwork();
			} else {
				setButtonText("Connect wallet");
			}

			window.ethereum.on("accountsChanged", function () {
				window.location.reload();
				console.log("test");
			});

			window.ethereum.on("networkChanged", function () {
				window.location.reload();
				console.log("testing");
			});
		} catch (e: any) {
			console.log(e.message);
			dispatch(setShowError(true));
			const err = setTimeout(() => {
				dispatch(setShowError(false));
			}, 1000);

			return () => clearTimeout(err);
		}
	};
	useLayoutEffect(() => {
		persistRender();
	}, [buttonText]);

	const fetchAddress = async (): Promise<any> => {
		try {
			const signerAddress = await signer.getAddress();
			dispatch(setWalletAddress(signerAddress));
		} catch (e: any) {
			console.log(e.message);
		}
	};
	useEffect(() => {
		fetchAddress();
	}, [walletAddress, signer]);

	return (
		<>
			<Container>
				<Buttons onClick={connectWallet} Var={"nav"}>
					{buttonText}
				</Buttons>
			</Container>
		</>
	);
}

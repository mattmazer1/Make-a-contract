import { useState, useEffect } from "react";
import type { RootState } from "../Redux/store";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { Buttons } from "../Styles/Buttons";
import { Header } from "../Styles/Header";
import { styled } from "../Styles/stitches.config";
import { Card, Input, TextArea } from "../Styles/Card";
import { contract } from "./Nav";
import { Link } from "react-router-dom";
import { setShowSuccess } from "../Redux/ShowSuccess";
import { setShowError } from "../Redux/ShowError";
import { setShowLoader } from "../Redux/ShowLoader";

const Container = styled("div", {
	display: "flex",
	flexDirection: "row",
	justifyContent: "center",
	marginTop: "2.5rem",
	marginBottom: "40rem",
});

export default function CreateContract() {
	const dispatch = useDispatch();
	const { walletAddress }: any = useSelector(
		(state: RootState) => state.walletAddress
	);
	const { loggedIn }: any = useSelector((state: RootState) => state.loggedIn);
	const [title, setTitle] = useState<string>("");
	const [rAddress, setRaddress] = useState<string>("");
	const [fee, setFee] = useState<number>();
	const [agreement, setAgreement] = useState<string>("");

	const postInfo = async (): Promise<any> => {
		const postData = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				creatorAddress: walletAddress,
				receivingAddress: rAddress,
				fee: fee,
				agreement: agreement,
			}),
		};
		try {
			const response = await fetch(
				process.env.REACT_APP_POST_INFO as string,
				postData
			);
			await response.json();

			if (!response.ok) {
				throw new Error("Something went wrong");
			}
		} catch (err: any) {
			dispatch(setShowError(true));
			const error = setTimeout(() => {
				dispatch(setShowError(false));
			}, 1000);

			return () => clearTimeout(error);
		}
	};

	const rAddressOnChange = ({ target }: any) => {
		setRaddress(target.value);
	};

	const feeOnChange = ({ target }: any) => {
		setFee(target.value);
	};

	const agreementOnChange = ({ target }: any) => {
		setAgreement(target.value);
	};
	useEffect(() => {
		loggedIn
			? setTitle("Create your contract!")
			: setTitle("Please connect your wallet");
	}, [loggedIn]);

	const create = async (): Promise<any> => {
		try {
			const providerSet: any = await contract.providerSetFee(
				ethers.utils.parseEther(`${fee}`)
			);
			dispatch(setShowLoader(true));
			await providerSet.wait(1);
			await postInfo();
			console.log("Success!");
			dispatch(setShowSuccess(true));
			const success = setTimeout(() => {
				dispatch(setShowSuccess(false));
				window.location.reload();
			}, 1000);
			return () => clearTimeout(success);
		} catch (err: any) {
			console.log(err.message);
			dispatch(setShowError(true));
			const error = setTimeout(() => {
				dispatch(setShowError(false));
			}, 1000);

			return () => clearTimeout(error);
		}
	};

	return (
		<>
			{loggedIn ? (
				<Link to="/existingcontracts">
					<Buttons
						Var={"nav"}
						css={{
							marginTop: "1.5rem",
							"@sm": { marginTop: "2rem", height: "2.2rem" },
						}}
					>
						Pending contracts
					</Buttons>
				</Link>
			) : null}

			<Container>
				<Header>{title}</Header>

				{!loggedIn ? (
					<Card Var={"block"}>
						<Card Var={"div1"}>
							<Card Var={"div2"}>
								<Input name="ethAddress" value={""} readOnly />
							</Card>

							<Card Var={"div2"}>
								<Input name="fee" value={""} readOnly />
							</Card>

							<Card Var={"div2"}>
								<TextArea
									name="message"
									placeholder="Connect your wallet to create your contract! "
									readOnly
								/>
							</Card>
							<Card Var={"div2"}>
								<Buttons Var={"card"}>Create contract</Buttons>
							</Card>
						</Card>
					</Card>
				) : (
					<Card Var={"block"}>
						<Card Var={"div1"}>
							<Card Var={"div2"}>
								<Input
									maxLength={50}
									placeholder="Receiving address"
									name="ethAddress"
									value={rAddress}
									onChange={rAddressOnChange}
									required
								/>
							</Card>

							<Card Var={"div2"}>
								<Input
									type="number"
									min={0}
									placeholder="Enter commission fee in Eth"
									name="fee"
									value={fee ? fee : ""}
									onChange={feeOnChange}
									required
								/>
							</Card>

							<Card Var={"div2"}>
								<TextArea
									placeholder="Type your agreement here"
									maxLength={300}
									name="message"
									value={agreement}
									onChange={agreementOnChange}
									required
								/>
							</Card>

							<Card Var={"div2"}>
								<Buttons Var={"card"} onClick={create}>
									Create contract
								</Buttons>
							</Card>
						</Card>
					</Card>
				)}
			</Container>
		</>
	);
}

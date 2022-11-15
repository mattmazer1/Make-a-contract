import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../Redux/store";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "../Styles/stitches.config";
import { Card } from "../Styles/Card";
import { Header1 } from "../Styles/PayCard";
import { Buttons } from "../Styles/Buttons";
import { Header } from "../Styles/Header";
import { Link } from "react-router-dom";
import { contract } from "./Nav";
import { setShowError } from "../Redux/ShowError";
import { setShowSuccess } from "../Redux/ShowSuccess";
import { setShowLoader } from "../Redux/ShowLoader";

const Container = styled("div", {
	display: "flex",
	flexDirection: "row",
	justifyContent: "center",
	marginTop: "2.5rem",
	marginBottom: "40rem",
});

export default function ContractPayout() {
	const dispatch = useDispatch();
	const { walletAddress }: any = useSelector(
		(state: RootState) => state.walletAddress
	);
	const { loggedIn }: any = useSelector((state: RootState) => state.loggedIn);

	const [title, setTitle] = useState<string>("");
	const [addressFrom, setAddressFrom] = useState<string>("");
	const navigate = useNavigate();

	useEffect(() => {
		loggedIn ? setTitle("Payout!") : setTitle("Please connect your wallet");
	}, [loggedIn]);

	const deleteInfo = async (): Promise<any> => {
		const deleteData = {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				address: walletAddress,
			}),
		};

		try {
			const response = await fetch(
				process.env.REACT_APP_DELETE_USER_INFO as string,
				deleteData
			);
			await response.json();

			if (!response.ok) {
				throw new Error("Something went wrong");
			}
		} catch (err: any) {
			console.log(err.mesage);
		}
	};

	const getInfo = async (): Promise<any> => {
		try {
			const response = await fetch(
				process.env.REACT_APP_GET_CARD_INFO as string
			);
			if (!response.ok) {
				console.log("No address");
			}
			const data = await response.json();
			console.log(data);
			setAddressFrom(data[0].address_from);
		} catch (err: any) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		getInfo();
	}, [walletAddress]);

	const transfer = async (): Promise<any> => {
		try {
			const payout: any = await contract.completion(true, addressFrom);
			dispatch(setShowLoader(true));
			await payout.wait(1);
			await deleteInfo();
			const success = setTimeout(() => {
				dispatch(setShowSuccess(true));
				navigate("/");
				window.location.reload();
			}, 1000);

			return () => clearTimeout(success);
		} catch (err: any) {
			console.log(err.mesage);
			dispatch(setShowError(true));
			const error = setTimeout(() => {
				dispatch(setShowError(false));
			}, 1000);

			return () => clearTimeout(error);
		}
	};
	return (
		<>
			<Link to="/">
				<Buttons
					Var={"nav"}
					css={{
						marginTop: "1.5rem",
						"@sm": { marginTop: "2rem" },
					}}
				>
					Home
				</Buttons>
			</Link>
			<Container>
				<Header>{title}</Header>
				<Card Var={"block"}>
					<Card Var={"payout"} css={{ marginTop: ".1rem" }}>
						<Card Var={"pdiv2"}>
							<Header1 Var={"h"}>Is the service done?</Header1>
						</Card>
						<Card
							Var={"pdiv2"}
							css={{ marginTop: "1rem", marginBottom: "1rem" }}
						>
							Pay your service provider !
						</Card>

						<Card Var={"buttonFund"}>
							<Buttons onClick={transfer} Var={"buyCard"}>
								Transfer funds
							</Buttons>
						</Card>
					</Card>
				</Card>
			</Container>
		</>
	);
}

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import type { RootState } from "../Redux/store";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "../Styles/stitches.config";
import { Card, Label } from "../Styles/Card";
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

export default function PayContract() {
	const { walletAddress }: any = useSelector(
		(state: RootState) => state.walletAddress
	);
	const { loggedIn }: any = useSelector((state: RootState) => state.loggedIn);

	const dispatch = useDispatch();
	const [title, setTitle] = useState<string>("");
	const [fee, setFee] = useState<number>();
	const [addressFrom, setAddressFrom] = useState<string>("");
	const [agreement, setAgreement] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);
	const [addressExist, setAddressExist] = useState<boolean>(false);
	const [total, setTotal] = useState<number>();
	const [end, setEnd] = useState<string>("");

	useEffect(() => {
		loggedIn
			? setTitle("Agree and pay!")
			: setTitle("Please connect your wallet");
	}, [loggedIn]);

	const postAddress = async (): Promise<any> => {
		const postData = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				walletAddress: walletAddress,
			}),
		};
		try {
			const response = await fetch(
				process.env.REACT_APP_POST_ADDRESS as string,
				postData
			);
			await response.json();

			if (!response.ok) {
				throw new Error("Something went wrong");
			}
		} catch (err: any) {
			console.log(err.any);
		}
	};

	const getAddressExists = async (): Promise<any> => {
		try {
			const response = await fetch(process.env.REACT_APP_GET_USERS as string);
			if (!response.ok) {
				console.log("No address");
			}
			const data = await response.json();
			if (data[0].address_to === undefined) {
				setAddressExist(false);
			} else {
				setAddressExist(true);
			}
		} catch (err: any) {
			console.log(err.message);
		}
	};

	const getInfo = async (): Promise<any> => {
		try {
			const response = await fetch(
				process.env.REACT_APP_GET_CARD_INFO as string
			);
			if (!response.ok) {
				console.log("Can't get info");
			}
			const data = await response.json();
			console.log(data);
			setAddressFrom(data[0].address_from);
			setFee(data[0].fee);
			setAgreement(data[0].agreement);
		} catch (err: any) {
			console.log(err.message);
		}
	};

	const getTotal = async (): Promise<any> => {
		try {
			const response = await fetch(process.env.REACT_APP_GET_TOTAL as string);
			if (!response.ok) {
				console.log("Can't get total");
			}
			const data = await response.json();
			console.log(data);
			setTotal(data[0].count);
			if (data[0].count > 1) {
				setEnd("contracts");
			} else {
				setEnd("contract");
			}
		} catch (err: any) {
			console.log(err.message);
		}
	};

	const fetchAll = async (): Promise<any> => {
		await postAddress();
		await getAddressExists();
		await getInfo();
		await getTotal();
		setLoading(false);
	};

	const patchBool = async (): Promise<any> => {
		const patchData = {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				bool: true,
				address: walletAddress,
			}),
		};
		try {
			const response = await fetch(
				process.env.REACT_APP_PATCH_PAY_BOOL as string,
				patchData
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
	const payContract = async (): Promise<any> => {
		try {
			const setPay: any = await contract.payProvider(addressFrom, {
				value: ethers.utils.parseEther((fee as number).toString()),
			});
			dispatch(setShowLoader(true));
			await setPay.wait(1);
			await patchBool();
			console.log("Success!");
			dispatch(setShowSuccess(true));
			const success = setTimeout(() => {
				dispatch(setShowSuccess(false));
				window.location.reload();
			}, 1000);

			return () => clearTimeout(success);
		} catch (err: any) {
			dispatch(setShowError(true));
			const error = setTimeout(() => {
				dispatch(setShowError(false));
			}, 1000);

			return () => clearTimeout(error);
		}
	};

	useEffect(() => {
		fetchAll();
	}, [walletAddress]);

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
			{loggedIn ? (
				<>
					{!addressExist ? (
						<Card Var={"pdiv3"} css={{ marginTop: "20rem", fontSize: "2rem" }}>
							You have no pending contracts.
						</Card>
					) : (
						<>
							<Container>
								<Header>{title}</Header>
								<Label>
									You have {total} pending {end}
								</Label>
								<Card Var={"block"}>
									<Card Var={"div1"}>
										<Card Var={"pdiv2"}>
											<Header1 Var={"h"}>Contract creation:</Header1>
										</Card>
										<Card Var={"pdiv3"}>
											{loading ? <div>loading...</div> : addressFrom}
										</Card>

										<Card Var={"pdiv2"}>
											<Header1 Var={"h"}>Commission fee:</Header1>
										</Card>

										<Card Var={"pdiv2"}>
											{loading ? <div>loading...</div> : <div>{fee} eth</div>}
										</Card>

										<Card Var={"pdiv2"}>
											<Header1 Var={"h"}>Agreement:</Header1>
										</Card>
										<Card Var={"pdiv2"}>
											<Card Var={"div4"}>
												{loading ? <div>loading...</div> : agreement}
											</Card>
										</Card>

										<Card Var={"buttonFund"}>
											<Buttons onClick={payContract} Var={"buyCard"}>
												Fund contract
											</Buttons>
										</Card>
									</Card>
								</Card>
							</Container>
						</>
					)}
				</>
			) : (
				<Card
					Var={"pdiv3"}
					css={{
						marginTop: "20rem",
						fontSize: "1rem",
						"@sm": { fontSize: "2rem" },
					}}
				>
					Your wallet is not connected
				</Card>
			)}
		</>
	);
}

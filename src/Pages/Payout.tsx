import Nav from "../Components/Nav";
import PayContract from "../Components/PayContract";
import ContractPayout from "../Components/ContractPayout";
import { useDispatch } from "react-redux";
import type { RootState } from "../Redux/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { setPay } from "../Redux/pay";
import { setShowError } from "../Redux/ShowError";
import ErrorP from "../Components/Error";
import Success from "../Components/Success";
import Loader from "../Components/Loader";

export default function Payout() {
	const dispatch = useDispatch();
	const { walletAddress }: any = useSelector(
		(state: RootState) => state.walletAddress
	);

	const { pay }: any = useSelector((state: RootState) => state.pay);

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
			console.log(err.message);
		}
	};

	const getAddressBool = async (): Promise<any> => {
		try {
			const response = await fetch(
				process.env.REACT_APP_GET_USER_PAID as string
			);

			if (!response.ok) {
				console.log("undefined address");
			}
			const data = await response.json();

			if (data[0].paid === undefined) {
				dispatch(setPay(false));
			} else {
				dispatch(setPay(data[0].paid));
			}
		} catch (err: any) {
			console.log(err.message);
		}
	};

	const fetchAll = async (): Promise<any> => {
		await postAddress();
		await getAddressBool();
	};

	useEffect(() => {
		fetchAll();
	}, [walletAddress]);

	return (
		<>
			<Nav />
			<ErrorP />
			<Success />
			<Loader />
			{pay ? <ContractPayout /> : <PayContract />}
		</>
	);
}

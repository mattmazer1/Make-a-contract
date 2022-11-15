import CreateContract from "../Components/CreateContract";
import ErrorP from "../Components/Error";
import Loader from "../Components/Loader";
import Nav from "../Components/Nav";
import Success from "../Components/Success";

export default function Home() {
	return (
		<>
			<Nav />
			<ErrorP />
			<Success />
			<Loader />
			<CreateContract />
		</>
	);
}

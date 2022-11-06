import { FC } from "react";
import { useAppSelector } from "store";
import { Navigate, useOutlet } from "react-router-dom";
import Header from "./Header";

const PrivateLayout: FC = () => {
	const { isAuthenticated } = useAppSelector((state) => state.user);
	const outlet = useOutlet();

	if (!isAuthenticated) {
		return <Navigate to="/auth" />;
	}

	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<div className="overflow-auto overflow-x-hidden">
				{outlet}
			</div>
		</div>
	);
};

export default PrivateLayout;

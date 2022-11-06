import { FC } from "react";
import { useOutlet } from "react-router-dom";

const PublicLayout: FC = () => {
	const outlet = useOutlet();

	return (
		<div className="min-h-screen flex flex-col h-screen overflow-hidden">
			{outlet}
		</div>
	);
};

export default PublicLayout;

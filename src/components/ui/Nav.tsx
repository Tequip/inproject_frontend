import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

export interface NavRoute {
	to: string;
	label: string;
}

interface NavProps {
	routes: NavRoute[];
}

const Nav: FC<NavProps> = ({ routes }) => {
	const location = useLocation();

	return (
		<div className="flex gap-4">
			{routes.map((route) => (
				<Link
					className={["text-secondary", location.pathname === route.to ? "text-primary" : ""].join(" ")}
					to={route.to}
					key={route.label}
				>
					{route.label}
				</Link>
			))}
		</div>
	);
};

export default Nav;

import { FC } from "react";
import angleSvg from "assets/angle.svg";

interface PaginationProps {
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	max?: number;
}

const Pagination: FC<PaginationProps> = ({ page, setPage, max = 5 }) => {
	const pages = new Array(max).fill("");

	const increasePage = () => {
		page < max && setPage(page => ++page);
	};

    const decreasePage = () => {
		page > 1 && setPage(page => --page);
	};

	return (
		<div className="flex">
			<button onClick={decreasePage}>
				<img src={angleSvg} alt="" />
			</button>
			<div className="flex items-center text-lg text-secondary">
				{pages.map((_, index) => (
					<button
						key={index}
						onClick={() => setPage(index + 1)}
						className={["p-1", index + 1 === page ? "font-bold text-primary" : ""].join(" ")}
					>
						{index + 1}
					</button>
				))}
			</div>
			<button onClick={increasePage}>
				<img className="rotate-180" src={angleSvg} alt="" />
			</button>
		</div>
	);
};

export default Pagination;

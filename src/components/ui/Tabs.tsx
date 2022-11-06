import { FC, ReactNode, useState } from "react";

interface TabsProps {
	headers: string[];
	children: ReactNode | ReactNode[];
	big?: boolean;
}

const Tabs: FC<TabsProps> = ({ headers, children, big }) => {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<div className="w-full">
			<div className="flex items-start gap-2 mb-2">
				{headers.map((header, index) => (
					<button
						className={[
							"mb-1 border-b-4 border-secondary text-left text-secondary",
							index === activeIndex ? "!text-primary !border-primary cursor-default" : "",
							index === headers.length - 1 ? "flex-1" : "",
							big ? 'text-2xl' : ''
						].join(" ")}
						onClick={() => setActiveIndex(index)}
						key={'tab_' + index}
					>
						{header}
					</button>
				))}
			</div>
			{Array.isArray(children) ? children[activeIndex] : children}
		</div>
	);
};

export default Tabs;

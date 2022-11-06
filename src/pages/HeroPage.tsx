/* eslint-disable jsx-a11y/no-distracting-elements */
import { FC } from "react";
import circlesImg from "assets/circles.png";
import circlesGif from "assets/circles.gif";
import dotsImg from "assets/dots.png";
import Button from "components/ui/Button";
import Marquee from "react-fast-marquee";
import { showAuthModal } from "store/reducers/modalsReducer";
import { useAppDispatch } from "store";

const HeroPage: FC = () => {
	const dispatch = useAppDispatch();

	const showModal = () => {
		dispatch(showAuthModal());
	};

	return (
		<div className="relative text-background min-h-screen">
			<div className="flex flex-col items-start text-left wrapper !py-12 z-10">
				<div className="mb-[250px]">
					<h1 className="text-secondary mb-2">
						<span className="text-accent">in</span>project
					</h1>
					<h3 className="max-w-2xl">
						Интерактивная платформа <br /> для реализации <br />
						<span className="text-accent">инновационных</span> идей
					</h3>
				</div>
				<div className="p-1 border-[1px] border-accent">
					<Button onClick={showModal} className="z-10" size="big">
						вступить в команду
					</Button>
				</div>
			</div>
			<img src={dotsImg} className="absolute top-[-80px] left-0 z-[-1]" alt="" />
			<div className="absolute w-full h-full top-0 left-0 bg-card z-[-3]"></div>
			<div className="absolute w-full top-[38%] bg-secondary h-8 -rotate-2"></div>
			<img className="absolute w-[950px] top-[-50px] right-0 z-[-2]" src={circlesGif} alt="circle" />
			<div className="flex absolute w-[calc(100%+40px)] left-[-20px] top-[35%] bg-primary h-8 -rotate-[9deg]">
				<Marquee className="font-[Practice] text-secondary" gradient={false}>
					прояви себя &nbsp; прояви себя &nbsp; прояви себя &nbsp; прояви себя &nbsp; прояви себя &nbsp;
					прояви себя &nbsp; прояви себя &nbsp; прояви себя &nbsp; прояви себя &nbsp; прояви себя &nbsp;
					прояви себя &nbsp; прояви себя &nbsp; прояви себя &nbsp; прояви себя &nbsp; прояви себя &nbsp;
					прояви себя &nbsp; прояви себя &nbsp; прояви себя &nbsp; прояви себя &nbsp; прояви себя &nbsp;
					прояви себя &nbsp; прояви себя &nbsp; прояви себя &nbsp; прояви себя &nbsp; прояви себя &nbsp;
					прояви себя &nbsp; прояви себя &nbsp; прояви себя &nbsp; прояви себя &nbsp; прояви себя &nbsp;
				</Marquee>
			</div>
		</div>
	);
};

export default HeroPage;

/* eslint-disable jsx-a11y/no-distracting-elements */
import { FC } from "react";
import cubeImg from "assets/cube.svg";
import arrowImg from "assets/arrow.svg";
import Button from "../ui/Button";
import Marquee from "react-fast-marquee";
import { showAuthModal } from "store/reducers/modalsReducer";
import { useAppDispatch } from "store";

const HeroSection: FC = () => {
    const dispatch = useAppDispatch();

    const showModal = () => {
        dispatch(showAuthModal());
    };

    return (
        <div className="relative bg-card text-background">
            <div className="text-left wrapper !py-8">
                <div>
                    <h1 className="text-accent">моспроект</h1>
                    <h3 className="max-w-2xl">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Quaerat est corporis in nostrum.
                    </h3>
                </div>
                <div className="relative top-[-70px] flex items-end justify-between">
                    <div className="relative flex flex-col items-start gap-4 mb-40">
                        <Button onClick={showModal} className="z-10" color="accent">вступить в команду</Button>
                        <Button onClick={showModal} className="z-10" color="secondary">создать проект</Button>
                        <img
                            width={180}
                            className="absolute top-[-77%] right-0"
                            src={arrowImg}
                            alt="arrow"
                        />
                    </div>
                    <img src={cubeImg} alt="cube" />
                </div>
            </div>
            <div className="absolute w-full top-[28%] bg-secondary h-8 -rotate-2"></div>
            <div className="flex absolute w-[calc(100%+40px)] left-[-20px] top-[26%] bg-primary h-8 -rotate-[9deg]">
                <Marquee
                    className="font-[Practice] text-secondary"
                    gradient={false}
                >
                    прояви себя &nbsp; прояви себя &nbsp; прояви себя &nbsp;
                    прояви себя &nbsp; прояви себя &nbsp; прояви себя &nbsp;
                    прояви себя &nbsp; прояви себя &nbsp; прояви себя &nbsp;
                    прояви себя &nbsp; прояви себя &nbsp; прояви себя &nbsp;
                    прояви себя &nbsp; прояви себя &nbsp; прояви себя &nbsp;
                    прояви себя &nbsp; прояви себя &nbsp; прояви себя &nbsp;
                    прояви себя &nbsp; прояви себя &nbsp; прояви себя &nbsp;
                    прояви себя &nbsp; прояви себя &nbsp; прояви себя &nbsp;
                    прояви себя &nbsp; прояви себя &nbsp; прояви себя &nbsp;
                    прояви себя &nbsp; прояви себя &nbsp; прояви себя &nbsp;
                </Marquee>
            </div>
        </div>
    );
};

export default HeroSection;

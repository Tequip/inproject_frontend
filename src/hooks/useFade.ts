import { RefObject, useEffect, useState } from "react";

export default function useFade(
	ref: RefObject<HTMLElement>
): [() => void, boolean] {
	const [isFade, setIsFade] = useState(false);

	const endFade = () => {
		setIsFade(false);
		ref.current?.classList.remove("fade-anim");
	};

	const startFade = () => {
		setIsFade(true);
		ref.current?.classList.add("fade-anim");
	};

	useEffect(() => {
		if (!ref.current) return;

		ref.current.onanimationend = endFade;
	}, [ref.current]);

	return [startFade, isFade];
}

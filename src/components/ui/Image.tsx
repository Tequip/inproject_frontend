import { FC } from "react";

interface ImageProps {
	height: number;
	src: string;
	className?: string;
	width?: number;
	alt?: string;
	defaultImg?: string;
}

const Image: FC<ImageProps> = ({ className = "", height, width, src, alt = "", defaultImg }) => {
	const h = height ? height + "px" : "100%";
	const w = width ? width + "px" : "100%";

	return (
		<div className={className}>
			<img
				className="bg-neutral-200 object-cover"
				width={w}
				height={h}
				src={src ? src : defaultImg}
				alt={alt}
				style={{
					minWidth: w,
					maxWidth: w,
					minHeight: h,
					maxHeight: h,
				}}
				onError={({ currentTarget }) => {
					currentTarget.onerror = null; // prevents looping
					currentTarget.src =
						"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOcVw8AAcEBH9bcTOEAAAAASUVORK5CYII=";
				}}
			/>
		</div>
	);
};

export default Image;

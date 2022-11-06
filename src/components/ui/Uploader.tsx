import { FC, useState } from "react";
import { Image } from "types";
import Icon from "./Icon";

export interface UploaderProps {
	value?: string;
	onChange?: (url: string, filename?: string) => void;
	className?: string;
}

const Uploader: FC<UploaderProps> = ({ className, value, onChange }) => {
	const [isHover, setIsHover] = useState(false);

	const onImageChange = (event: any) => {
		if (event.target.files && event.target.files[0]) {
			let img = event.target.files[0];
			const FR = new FileReader();

			FR.addEventListener("load", function (evt) {
				evt?.target && onChange && onChange("" + evt.target.result, img.name);
			});

			FR.readAsDataURL(img);
		}
	};

	return (
		<div className="flex gap-2">
			<label
				htmlFor="upload-image"
				title="Upload image"
				className={[
					"w-[500px] h-[350px] relative flex items-center justify-start cursor-pointer",
					className,
				].join(" ")}
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
			>
				
				<div
					style={{ borderStyle: value ? "solid" : "dashed" }}
					className="w-full h-full relative overflow-hidden border-2 border-primary flex items-center justify-center"
				>
					{value && value.length ? (
						<div
							className="w-full h-full bg-cover bg-center"
							style={{ backgroundImage: `url(${value})` }}
						></div>
					) : (
						<div className="flex items-center flex-col gap-4">
							<Icon name="upload" size="2xl" color="var(--color-secondary)" />
							<span className="text-lg text-secondary">Минимальное разрешение 600 на 400 пикселей</span>
						</div>
					)}
					<div
						style={{ opacity: isHover ? 1 : 0 }}
						className="transition-all flex items-center justify-center bg-neutral-200/40 absolute w-full h-full"
					>
						{!!value && !!value.length && <Icon className="!opacity-60" size="md" name="upload" />}
					</div>
				</div>
				<input id="upload-image" className="hidden" type="file" onChange={onImageChange} />
			</label>
			{/* <div className="flex flex-col gap-2">
				{value?.map((img) => (
					<img className="border-2 border-secndary" width={150} height={60} src={img} alt="" />
				))}
			</div> */}
		</div>
	);
};

export default Uploader;

import projectsAPI, { ICreateProjectPayload } from "api/projectsAPI";
import Input from "components/ui/Input";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FullProject, Image, Location, Tag } from "types";
import "react-upload-gallery/dist/style.css";
import Uploader from "components/ui/Uploader";
import { Controller, useForm } from "react-hook-form";
import TagContainer from "components/common/TagContainer";
import Select, { Option } from "components/ui/Select";
import entityAPI from "api/entityAPI";
import Button from "components/ui/Button";
import { useAppSelector } from "store";
import UserPicker from "components/common/UserPicker";

interface EditProjectPageProps {}

interface EditProject extends FullProject {
	photo: Image[];
}

const EditProjectPage: FC<EditProjectPageProps> = ({}) => {
	const { user } = useAppSelector((state) => state.user);
	const [locations, setLocations] = useState<Location[]>([]);
	const [tags, setTags] = useState<Tag[]>([]);
	const { id } = useParams();
	const { register, handleSubmit, reset, control } = useForm<EditProject>({
		defaultValues: {
			title: "",
			photo: [],
			about: "",
			short_about: "",
			members: [],
			categories: [],
			locations: [],
			tags: [],
		},
	});

	useEffect(() => {
		entityAPI.getLocations().then((locations) => setLocations(locations));
		entityAPI.getTags().then((tags) => setTags(tags));
	}, []);

	useEffect(() => {
		id && projectsAPI.getProject(+id).then((project) => reset({}));
	}, [id]);

	const onSubmit = (project: EditProject) => {
		projectsAPI.createProject({
			title: project.title,
			images: project.photo,
			about: project.about,
			short_about: project.short_about,
			members: project.members.map((item) => ({
				role: item.role,
				user_id: item.user?.id || null,
			})),
			categories: project.categories.map((item) => item.id),
			locations: project.locations.map((item) => item.id),
			tags: project.tags.map((item) => item.id),
			owner_id: user?.id,
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="wrapper py-8">
			<header className="mb-4">
				<h2 className="block text-left text-primary">создайте свой проект</h2>
			</header>
			<div className="flex flex-col items-start mb-8">
				<label className="text-2xl mb-1">Название проекта</label>
				<input
					className="h-[48px] w-full p-2 border-2 border-secondary outline-none"
					placeholder="Введите название"
					type="text"
					{...register("title")}
				/>
			</div>
			<div className="text-left mb-4">
				<span className="mb-2 text-xl">Добавьте изображение</span>
				<Controller
					name="photo"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Uploader
							value={value.length ? value[0].file : ""}
							onChange={(file, filename) =>
								onChange([
									{
										file,
										filename,
									},
								])
							}
							className="col-span-1"
						/>
					)}
				/>
			</div>
			{/* <span className="block mb-2 text-xl text-left">Команда</span> */}
			{/* <Controller
				name="members"
				control={control}
				render={({ field: { onChange, value } }) => <UserPicker members={value} onChange={onChange} />}
			/> */}
			<div className="flex flex-col gap-4">
				<Controller
					name="locations"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Select
							label="Регион"
							value={value}
							onChange={onChange}
							placeholder="Выберите регион"
							options={locations}
						/>
					)}
				/>
				<Controller
					name="tags"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Select
							label="Теги"
							value={value}
							onChange={onChange}
							placeholder="Выберите теги"
							options={tags}
							full
							multi
						/>
					)}
				/>
				<Controller
					name="short_about"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Input
							placeholder="Введите краткое описание"
							label="Краткое описание"
							change={onChange}
							value={value}
							multiline
							full
						/>
					)}
				/>
				<Controller
					name="about"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Input
							placeholder="Введите описание"
							height={400}
							label="Описание"
							change={onChange}
							value={value}
							multiline
							full
						/>
					)}
				/>
				<Button className="mx-auto">опубликовать</Button>
			</div>
		</form>
	);
};

export default EditProjectPage;

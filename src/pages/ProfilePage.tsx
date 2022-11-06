import Button from "components/ui/Button";
import DatePicker from "components/ui/DatePicker";
import UploadImage from "components/ui/UploadImage";
import Input from "components/ui/Input";
import { FC, useEffect, useState } from "react";
import userAPI, { CreateUserPayload } from "api/userAPI";
import { Controller, useForm } from "react-hook-form";
import { Interest, Skill, Tag, User } from "types";
import Select from "components/ui/Select";

interface ProfilePageProps {}

const ProfilePage: FC<ProfilePageProps> = ({}) => {
	const [skills, setSkills] = useState<Skill[]>([]);
	const [interests, setInterests] = useState<Interest[]>([]);
	const { register, handleSubmit, reset, control } = useForm<CreateUserPayload>({
		defaultValues: {
			skill: [],
			interest: [],
			first_name: "",
			last_name: "",
			email: "",
			telegram: "",
			about: "",
			status: "",
			role: "",
			photo: {
				file: "",
				filename: "",
			},
		},
	});

	useEffect(() => {
		userAPI.getUser().then((user) =>
			reset({
				skill: user.skill,
				interest: user.interest,
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email,
				telegram: user.telegram,
				about: user.about,
				status: user.status,
				role: user.role,
				photo: {
					file: user.photo,
					filename: "",
				},
			})
		);
		userAPI.getUserSkills().then((skills) => setSkills(skills));
		userAPI.getUserInterests().then((data) => setInterests(data));
	}, []);

	const onSubmit = (userPayload: CreateUserPayload) => {
		userAPI.updateUser(userPayload);
	};

	return (
		<div className="wrapper py-8 mx-auto w-fit">
			<form className="max-w-[680px]" onSubmit={handleSubmit(onSubmit)}>
				<header className="flex mb-4">
					<h2 className="text-primary">Моя страница</h2>
				</header>
				<div className="flex gap-8 mb-8 w-fit">
					<div>
						<Controller
							name="photo"
							control={control}
							render={({ field: { onChange, value } }) => (
								<UploadImage
									className="col-span-1"
									value={value.file}
									onChange={(file, filename) =>
										onChange({
											file: file || '',
											filename,
										})
									}
								/>
							)}
						/>
						<div className="text-left">
							<div className="mt-4 mb-2">Контакты:</div>
							<Input placeholder="email" className="mb-2" {...register("email")} full />
							<Input placeholder="telegram" {...register("telegram")} full />
						</div>
					</div>
					<div className="w-full flex flex-col gap-4">
						<Input label="Имя" {...register("first_name")} />
						<Input label="Фамилия" {...register("last_name")} />
						<Input label="Статус" {...register("status")} />
						<DatePicker label="Дата рождения" />
						<Controller
							name="about"
							control={control}
							render={({ field: { onChange, value } }) => (
								<Input value={value} change={onChange} label="О себе" multiline />
							)}
						/>
					</div>
				</div>
				<div className="flex items-center justify-center flex-col gap-8">
					<Controller
						name="interest"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Select placeholder="Выберите интересы" label="Интересы" value={value} onChange={onChange} options={interests} multi full />
						)}
					/>
					<Controller
						name="skill"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Select placeholder="Выберите навыки" label="Навыки" value={value} onChange={onChange} options={skills} multi full />
						)}
					/>
					<Input {...register("role")} label="Желаемая роль" full />
					<Button type="submit" className="w-[360px]">
						Сохранить изменения
					</Button>
				</div>
			</form>
		</div>
	);
};

export default ProfilePage;

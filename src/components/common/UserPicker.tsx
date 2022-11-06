import userAPI from "api/userAPI";
import Icon from "components/ui/Icon";
import IconButton from "components/ui/IconButton";
import Image from "components/ui/Image";
import Select from "components/ui/Select";
import Tag from "components/ui/Tag";
import { FC, useEffect, useState } from "react";
import { Member, User } from "types";

interface UserPickerProps {
	members: Member[];
	onChange: (members: Member[]) => void;
}

const UserPicker: FC<UserPickerProps> = ({ members, onChange }) => {
	const [users, setUsers] = useState<User[]>([]);
	const [choosedUser, setChoosedUser] = useState<User>();

	useEffect(() => {
		userAPI.getAllUsers().then((users) => setUsers(users));
	}, []);

	const addUser = () => {
		onChange([
			...members,
			{
				role: "",
				user: {
					id: null,
				},
			} as Member,
		]);
	};

	const deleteUser = (id?: number | null) => {
		onChange(members.filter((member) => member?.user?.id !== id));
	};

	const editRole = (role: string, id?: number | null) => {
		const newMembers = members.map((member) => {
			if (member.user?.id === id) {
				member.role = role;
			}

			return member;
		});

		onChange(newMembers);
	};

	return (
		<div>
			{members.map((member, index) => {
				const user = member.user;

				return (
					<div key={index} className="flex items-center gap-2 mb-4 px-4 py-2 border-2 border-secondary">
						<span>{index + 1}</span>
						<Image src={user?.photo || ""} width={40} height={40} />
						<Select
							value={[{
								value: user?.id,
								label: user?.first_name + " " + user?.last_name,
							}]}
							onChange={(user) => setChoosedUser(user.pop())}
							placeholder="выберите участника"
							options={users.map((user) => ({
								id: user.id,
								name: user.first_name + " " + user.last_name,
							}))}
						/>
						<Tag
							className="ml-auto"
							text={user?.role || "Роль в команде"}
							onChange={(value) => editRole(value, member.user?.id)}
							editable
						/>
						<IconButton onClick={() => deleteUser(user?.id)} name="delete" color="var(--color-secondary)" />
					</div>
				);
			})}
			<button onClick={addUser} className="underline text-secondary">
				Добавить участника
			</button>
		</div>
	);
};

export default UserPicker;

import { FC } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store";
import { showAuthModal } from "store/reducers/modalsReducer";
import { logout } from "store/reducers/userReducer";
import Avatar from "./ui/Avatar";
import Icon from "./ui/Icon";
import Nav, { NavRoute } from "./ui/Nav";

const navRoutes: NavRoute[] = [
	{
		label: "Проекты",
		to: "/",
	},
	// {
	// 	label: "События",
	// 	to: "/events",
	// },
];

const Header: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { isAuthenticated, user } = useAppSelector((state) => state.user);

	const showModal = () => {
		dispatch(showAuthModal());
	};

	const exit = () => {
		dispatch(logout());
	};

	return (
		<div className="sticky top-0 bg-background z-[999]">
			<div className="flex items-center justify-between h-[54px] wrapper">
				<Nav routes={navRoutes} />
				<div>
					{isAuthenticated ? (
						<div className="flex items-center gap-4">
							<button
								onClick={() => navigate("/edit_project")}
								className="bg-primary text-background p-2 flex items-center"
							>
								<span>Создать проект</span>
							</button>
							<div className="dropdown">
								<Avatar src={user?.photo || ""} size="lg" />
								<div className="dropdown-content">
									<span>{user?.email}</span>
									<button
										className="mt-4 dropdown-content__item"
										onClick={() => navigate("/profile")}
									>
										Профиль
									</button>
									{user?.is_admin && <button
										className="dropdown-content__item bg-accent"
										onClick={() => navigate("/admin")}
									>
										Панель админа
									</button>}
									<button className="dropdown-content__item flex gap-2" onClick={exit}>
										<span>Выход</span>
										<Icon name="logout" color="var(--color-danger)" />
									</button>
								</div>
							</div>
						</div>
					) : (
						<button onClick={showModal} className="text-secondary flex items-center gap-2">
							<Icon name="login" color="var(--color-secondary)" />
							<span>Вход</span>
						</button>
					)}
				</div>
			</div>
			<hr className="shadow-md border-t-8 border-primary" />
		</div>
	);
};

export default Header;

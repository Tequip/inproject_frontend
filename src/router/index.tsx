import { Route, Routes } from "react-router-dom";
import MainPage from "pages/MainPage";
import PrivateLayout from "components/PrivateLayout";
import PublicLayout from "components/PublicLayout";
import ProjectPage from "pages/ProjectPage";
import UserPage from "pages/UserPage";
import ProfilePage from "pages/ProfilePage";
import EditProjectPage from "pages/EditProjectPage";
import EventsPage from "pages/EventsPage";
import HeroPage from "pages/HeroPage";
import AdminPage from "pages/AdminPage";

export default function Router() {
	return (
		<Routes>
			<Route element={<PublicLayout />}>
				<Route path="/auth" element={<HeroPage />} />
			</Route>
			<Route element={<PrivateLayout />}>
				<Route index element={<MainPage />} />
				<Route path="/events" element={<EventsPage />} />
				<Route path="/admin" element={<AdminPage />} />
				<Route path="/project/:id" element={<ProjectPage />} />
				<Route path="/user/:id" element={<UserPage />} />
				<Route path="/edit_project/:id" element={<EditProjectPage />} />
				<Route path="/edit_project" element={<EditProjectPage />} />
				<Route path="/profile" element={<ProfilePage />} />
			</Route>
		</Routes>
	);
}

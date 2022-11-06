export type sort = "asc" | "desc" | null;

export interface Event {
	id: number;
	name: string;
	title_photo?: any;
	locations: Location[];
	categories: Category[];
	tags: Tag[];
	short_about: string;
}

export interface Image {
	file: string;
	filename: string;
}
export interface User {
	id: number | null;
	first_name: string;
	last_name: string;
	email: string;
	telegram: string;
	about: string;
	status: string;
	role: string;
	photo: string;
	project_creator: Project[],
	project_member: Project[],
	project_liked: Project[]
	skill: Skill[];
	interest: Interest[];
	is_admin: boolean;
}

export interface Member {
	role: string;
	user: User | null;
}

export interface Project {
	id: number;
	title: string;
	image: string;
	about: string;
	date: string;
	categories: Category[];
	locations: Location[];
	tags: Tag[];
	likes: number;
	created: string;
}

export interface FullProject {
	id: number;
	title: string;
	images: {
		id: string;
		url: string;
	}[];
	about: string;
	short_about: string;
	date: string;
	categories: Category[];
	locations: Location[];
	tags: Tag[];
	likes: number;
	created: string;
	deadline: string;
	stage: string;
	owner: User;
	members: Member[];
	related_projects: Project[];
	is_project_owner: boolean;
	is_project_member: boolean;
	is_hidden: boolean;
	owner_id?: number | null;
}

export interface Category {
	id: number;
	name: string;
}

export interface Stage {
	id: number;
	name: string;
}

export interface Location {
	id: number;
	name: string;
}

export interface Tag {
	id: number;
	name: string;
}

export interface Interest {
	id: number;
	name: string;
}

export interface Skill {
	id: number;
	name: string;
}
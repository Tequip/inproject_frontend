import Tabs from "components/ui/Tabs";
import { FC } from "react";

interface AdminPageProps {}

const AdminPage: FC<AdminPageProps> = ({}) => {
	return (
		<div className="wrapper py-8">
			<header className="mb-4">
				<h2 className="block text-left text-primary">Панель администратора</h2>
			</header>
			<div>
				<Tabs headers={["Участник проектов", "Создатель проектов"]}>
					<div>
						<div className="flex  flex-row items-end">
							<iframe
								width="600"
								height="600"
								seamless
								frameBorder="0"
								scrolling="no"
								src="http://158.160.16.111:8888/superset/explore/p/61Z4kzW9ARw/?standalone=1&height=600"
							></iframe>
							<iframe
								width="600"
								height="600"
								seamless
								frameBorder="0"
								scrolling="no"
								src="http://158.160.16.111:8888/superset/explore/p/bQ14gxoLekJ/?standalone=1&height=600"
							></iframe>
						</div>

						<div>
							<iframe
								width="1200"
								height="600"
								seamless
								frameBorder="0"
								scrolling="no"
								src="http://158.160.16.111:8888/superset/explore/p/pDQLMO79V8m/?standalone=1&height=600"
							></iframe>
						</div>

						<div>
							<iframe
								width="1200"
								height="600"
								seamless
								frameBorder="0"
								scrolling="no"
								src="http://158.160.16.111:8888/superset/explore/p/GlkLJKdPOqY/?standalone=1&height=600"
							></iframe>
						</div>
						<div>
							<iframe
								width="1200"
								height="600"
								seamless
								frameBorder="0"
								scrolling="no"
								src="http://158.160.16.111:8888/superset/explore/p/GO2L7XvPYkn/?standalone=1&height=600"
							></iframe>
						</div>
					</div>
					<div>
						<div className="flex  flex-row items-end">
							<iframe
								width="600"
								height="600"
								seamless
								frameBorder="0"
								scrolling="no"
								src="http://158.160.16.111:8888/superset/explore/p/EeG4mzWLM2w/?standalone=1&height=600"
							></iframe>
							<iframe
								width="600"
								height="600"
								seamless
								frameBorder="0"
								scrolling="no"
								src="http://158.160.16.111:8888/superset/explore/p/mN14vKBL6rQ/?standalone=1&height=600"
							></iframe>
						</div>
						<div className="flex  flex-row items-end">
							<iframe
								width="600"
								height="600"
								seamless
								frameBorder="0"
								scrolling="no"
								src="http://158.160.16.111:8888/superset/explore/p/75bLGrz408a/?standalone=1&height=600"
							></iframe>
							<iframe
								width="600"
								height="600"
								seamless
								frameBorder="0"
								scrolling="no"
								src="http://158.160.16.111:8888/superset/explore/p/g5KPADWLkG6/?standalone=1&height=600"
							></iframe>
						</div>
					</div>
				</Tabs>
			</div>
		</div>
	);
};

export default AdminPage;

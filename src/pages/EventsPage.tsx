import eventsAPI from "api/eventsAPI";
import { FC, useEffect, useState } from "react";

interface EventsPageProps {}

const EventsPage: FC<EventsPageProps> = ({}) => {
	const [events, setEvents] = useState();

	// useEffect(() => {
	// 	eventsAPI.getAllEvents().then((events) => setEvents(events));
	// }, []);

	return <div>EventsPage</div>;
};

export default EventsPage;

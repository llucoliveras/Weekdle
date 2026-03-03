import "./App.css";
import { useEffect, useState } from "react";
import { Practice } from "./Practice.js";
import { Information } from "./Information.js";
import { SideNav } from "./SideNav.js";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function App() {
	const [view, setView] = useState("practice");
    const [date, setDate] = useState(null);
    const [correctDay, setCorrectDay] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [history, setHistory] = useState([]);

	const getRandomDate = () => {
		const start = new Date(1900, 0, 1);
		const end = new Date(2026, 11, 31);
		const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
		return new Date(randomTime);
	}

	const generateNewDate = () => {
		const randomDate = getRandomDate();
		const jsDayIndex = randomDate.getUTCDay();
		const adjustedIndex = (jsDayIndex + 6) % 7;

		setDate(randomDate);
		setCorrectDay(days[adjustedIndex]);
		setSelectedDay(null);
		setAnswered(false);
	}

    useEffect(() => {
        if (!date) generateNewDate();
    }, [date]);

	return (
		<div className="appWrapper">
			<SideNav view={view} setView={setView} />

			<div className="mainContent">
				{view === "practice" ? (
					<Practice
						days={days}
						date={date}
						answered={answered}
						setAnswered={setAnswered}
						correctDay={correctDay}
						selectedDay={selectedDay}
						setSelectedDay={setSelectedDay}
						history={history}
						setHistory={setHistory}
						generateNewDate={generateNewDate}
					/>
				) : (
					<Information />
				)}
			</div>
		</div>
	);
}
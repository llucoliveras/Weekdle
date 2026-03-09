import "./App.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SideNav } from "./pages/SideNav/SideNav.js";
import { Home } from "./pages/Home/Home.js";
import { Practice } from "./pages/Practice/Practice.js";
import { Information } from "./pages/Information/Information.js";
import { Settings } from "./pages/Settings/Settings.js";
import { Solver } from "./pages/Solver/Solver.js";

export default function App() {
	const daysOfWeek = useMemo(() => [
		"days.monday",
		"days.tuesday",
		"days.wednesday",
		"days.thursday",
		"days.friday",
		"days.saturday",
		"days.sunday"
	], []);
	const [view, setView] = useState("home");
    const [date, setDate] = useState(null);
    const [correctDay, setCorrectDay] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [history, setHistory] = useState(() => {
		const saved = localStorage.getItem("practice_history");
		return saved ? JSON.parse(saved) : [];
	});

	const getRandomDate = () => {
		const start = new Date(1900, 0, 1);
		const end = new Date(2026, 11, 31);
		const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
		return new Date(randomTime);
	}

	const generateNewDate = useCallback(() => {
		const randomDate = getRandomDate();
		const jsDayIndex = randomDate.getUTCDay();
		const adjustedIndex = (jsDayIndex + 6) % 7;

		setDate(randomDate);
		setCorrectDay(daysOfWeek[adjustedIndex]);
		setSelectedDay(null);
		setAnswered(false);
	}, [daysOfWeek])

    useEffect(() => {
        if (!date) generateNewDate();
    }, [date, generateNewDate]);

	useEffect(() => {
		localStorage.setItem("practice_history", JSON.stringify(history));
	}, [history]);

	return (
        <div className="appWrapper">
            <SideNav view={view} setView={setView} />
            <div className="mainContent">
                {/* Add the conditional rendering for home */}
                {view === "home" ? (
                    <Home setView={setView} />
                ) : view === "practice" ? (
                    <Practice
						daysOfWeek={daysOfWeek}
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
                ) : view === "information" ? (
                    <Information />
                ) : view === "settings" ? (
                    <Settings />
                ) : view === "solver" ? (
					<Solver	/>
				) : (
                    <div className="container">
                        <h2>Coming Soon</h2>
                        <p>The {view} page is under construction.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
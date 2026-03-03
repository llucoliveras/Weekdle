import './Practice.css';
import { History } from './History';

export const Practice = (props) => {
    const {
        days,
        date,
        answered,
        setAnswered,
        correctDay,
        selectedDay,
        setSelectedDay,
        history,
        setHistory,
        generateNewDate,
    } = props;

    const handleClick = (day) => {
        if (answered) return;

        const now = new Date();

        setSelectedDay(day);
        setAnswered(true);

        const isCorrect = day === correctDay;

        setHistory((prev) => [
            {
                date: formatDate(date),
                guess: day,
                correct: correctDay,
                isCorrect,
                time: formatTime(now),
            },
            ...prev,
        ]);
    }

    const renderButton = (day) => {
        let buttonClass = "backgroundWhite";

        if (answered) {
            if (day === correctDay) {
                buttonClass = "backgroundGreen";
            } else if (day === selectedDay) {
                buttonClass = "backgroundRed";
            }
        }

        return (
            <button
                key={day}
                onClick={() => handleClick(day)}
                className={`button ${buttonClass}`}
            >
                {day}
            </button>
        );
    }

    const formatDate = (date) => {
        return date.toLocaleDateString("en-GB");
    }

    const formatTime = (date) => {
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");

        return `${hours}:${minutes}:${seconds}`;
    }

    return (
        <>
            <div className="container">
                <div className="topSection">
                    <div className={`date ${answered ? "shifted" : ""}`}>
                        {date && formatDate(date)}
                    </div>
                    <div className={`button-wrapper ${answered ? "visible" : ""}`}>
                        <button className="nextButton" onClick={generateNewDate}>
                            Next Day
                        </button>
                    </div>
                </div>

                <div className="buttonGrid">
                    {days.map((day) => renderButton(day))}
                </div>
            </div>
            <History history={history} />
        </>
    )
}
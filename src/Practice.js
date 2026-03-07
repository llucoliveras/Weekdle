import './Practice.css';
import { History } from './History';
import { useTranslation } from 'react-i18next';

export const Practice = (props) => {
    const {
        daysOfWeek,
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
    
    const { t } = useTranslation();
    
    // Inside Practice.js -> handleClick
    const handleClick = (dayKey) => { // 'dayKey' is "days.monday", etc.
        if (answered) return;

        const now = new Date();
        setSelectedDay(dayKey);
        setAnswered(true);

        // Get the correct index (0-6) from JS Date
        const jsDayIndex = date.getDay(); 
        // Adjust to match your array (Monday = 0, Sunday = 6)
        const adjustedCorrectIndex = (jsDayIndex + 6) % 7;

        setHistory((prev) => [
            {
                date: formatDate(date),
                guess: dayKey, // Save the key "days.monday", not the translated word
                correct: daysOfWeek[adjustedCorrectIndex], // Save the key "days.sunday", etc.
                isCorrect: dayKey === daysOfWeek[adjustedCorrectIndex],
                time: formatTime(now),
            },
            ...prev,
        ]);
    };

    const renderButton = (dayKey) => {
        let buttonClass = "backgroundWhite";
        if (answered) {
            if (dayKey === correctDay) buttonClass = "backgroundGreen";
            else if (dayKey === selectedDay) buttonClass = "backgroundRed";
        }

        return (
            <button key={dayKey} onClick={() => handleClick(dayKey)} className={`button ${buttonClass}`}>
                {t(dayKey)}
            </button>
        );
    };

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
                    {daysOfWeek.map((dayKey) => renderButton(dayKey))} 
                </div>
            </div>
            <History history={history} daysOfWeek={daysOfWeek} />
        </>
    )
}
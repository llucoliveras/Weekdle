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

        setSelectedDay(dayKey);
        setAnswered(true);

        // Get the correct index (0-6) from JS Date
        const jsDayIndex = date.getDay(); 
        // Adjust to match your array (Monday = 0, Sunday = 6)
        const adjustedCorrectIndex = (jsDayIndex + 6) % 7;
        const correctDay = daysOfWeek[adjustedCorrectIndex]; // This is the correct day key, e.g., "days.sunday"

        const attempt = {
                date: formatDate(date),
                guess: dayKey, // Save the key "days.monday", not the translated word
                correct: correctDay, // Save the key "days.sunday", etc.
                isCorrect: dayKey === correctDay,
                timestamp: Date.now(),
            };

        setHistory((prev) => [
            attempt,
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
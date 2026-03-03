import './History.css';

export const History = ({ history }) => {
    return (
        <div className="historyContainer">
            <h3>History</h3>
            {history.length === 0 && <p>No guesses yet</p>}
            {history.map((entry, index) => (
                <div key={index} className={`historyItem ${entry.isCorrect ? "historyCorrect" : "historyWrong"}`}>
                <div className="historyHeader">
                    <strong>{entry.date}</strong>
                    <span className="historyTime">{entry.time}</span>
                </div>
                <div>You guessed: {entry.guess}</div>
                {!entry.isCorrect && <div>Correct: {entry.correct}</div>}
                </div>
            ))}
        </div>
    )
}
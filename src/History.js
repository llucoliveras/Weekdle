import './History.css';
import { useTranslation } from 'react-i18next';

export const History = ({ history }) => {
    const { t } = useTranslation();

    return (
        <div className="historyContainer">
            <h3>{t('history.title')}</h3>
            {history.length === 0 && <p>{t('history.empty')}</p>}
            {history.map((entry, index) => (
                <div key={index} className={`historyItem ${entry.isCorrect ? "historyCorrect" : "historyWrong"}`}>
                    <div className="historyHeader">
                        <strong>{entry.date}</strong>
                        <span className="historyTime">{entry.time}</span>
                    </div>
                    <div>
                        {t('history.youGuessed')}: {t(`days.${entry.guess.toLowerCase()}`)}
                    </div>
                    {!entry.isCorrect && (
                        <div>
                            {t('history.correct')}: {t(`days.${entry.correct.toLowerCase()}`)}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
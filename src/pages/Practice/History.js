import './History.css';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

export const History = ({ history }) => {
    const { t } = useTranslation();
    const [, setTick] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            // Check if the most recent entry is less than 60 seconds old
            const hasRecentEntry = history.length > 0 && (Date.now() - history[0].timestamp < 61000);

            if (hasRecentEntry) {
                // If it's fresh, we update every second for that smooth "seconds ago" feel
                setTick(s => s + 1);
            } else {
                // If it's old, we only update when the seconds hit zero (roughly every minute)
                // This saves energy while keeping the minutes accurate
                if (new Date().getSeconds() === 0) {
                    setTick(s => s + 1);
                }
            }
        }, 1000); // Always check every second

        return () => clearInterval(timer);
    }, [history]);

    // Helper inside the component to use 't' directly
    const getTimeAgo = (timestamp) => {
        if (!timestamp) return "";
        
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        console.log(Date.now(), timestamp, seconds);

        if (seconds < 15) return t('history.time.justNow');

        const intervals = [
            { label: 'year', seconds: 31536000 },
            { label: 'month', seconds: 2592000 },
            { label: 'week', seconds: 604800 },
            { label: 'day', seconds: 86400 },
            { label: 'hour', seconds: 3600 },
            { label: 'minute', seconds: 60 },
            { label: 'second', seconds: 1 }
        ];

        for (let i = 0; i < intervals.length; i++) {
            const interval = Math.floor(seconds / intervals[i].seconds);
            console.log(seconds, intervals[i].seconds, interval);
            if (interval >= 1) {
                // Returns plural or singular based on i18next count logic
                return t(`history.time.${interval <= 1 ? intervals[i].label : intervals[i].label + '_plural'}`, { count: interval });
            }
        }

        return t('history.time.justNow');
    };

    return (
        <div className="historyContainer">
            <h3>{t('history.title')}</h3>
            {history.length === 0 && <p>{t('history.empty')}</p>}
            
            {[...history].map((entry, index) => (
                <div key={entry.timestamp || index} className={`historyItem ${entry.isCorrect ? "historyCorrect" : "historyWrong"}`}>
                    <div className="historyHeader">
                        <strong>{entry.date}</strong>
                        <span className="historyTime">{getTimeAgo(entry.timestamp)}</span>
                    </div>
                    <div className="historyDetail">
                        {t('history.youGuessed')}: <strong>{t(entry.guess)}</strong>
                    </div>
                    {!entry.isCorrect && (
                        <div className="historyDetail">
                            {t('history.correct')}: <strong>{t(entry.correct)}</strong>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
import './SideNav.css';
import { useTranslation } from 'react-i18next';

export const SideNav = ({ view, setView }) => {
    const { t } = useTranslation();

    return (
        <nav className="sideNav">
            <div className="navLogo">📅 GuessDay</div>
            <button 
                className={`navItem ${view === 'practice' ? 'active' : ''}`} 
                onClick={() => setView('practice')}
            >
                {t('nav.practice')}
            </button>
            <button 
                className={`navItem ${view === 'method' ? 'active' : ''}`} 
                onClick={() => setView('method')}
            >
                {t('nav.information')}
            </button>
            <button 
                className={`navItem ${view === 'settings' ? 'active' : ''}`} 
                onClick={() => setView('settings')}
            >
                {t('nav.settings')}
            </button>
        </nav>
    )
}
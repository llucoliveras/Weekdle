import './SideNav.css';
import { useTranslation } from 'react-i18next';
import { Home, Zap, BookOpen, Settings, Calculator, MoreHorizontal, Dumbbell } from 'lucide-react';

export const SideNav = ({ view, setView }) => {
    const { t } = useTranslation();

    return (
        <nav className="sideNav">
            <div className="navLogo">📅 GuessDay</div>

            <button className={`navItem ${view === 'home' ? 'active' : ''}`} onClick={() => setView('home')}>
                <Home size={18} />
                <span>{t('nav.home')}</span>
            </button>
            
            {/* Primary Actions */}
            <button className={`navItem ${view === 'practice' ? 'active' : ''}`} onClick={() => setView('practice')}>
                <Dumbbell size={18} />
                <span>{t('nav.practice')}</span>
            </button>
            
            <button className={`navItem ${view === 'method' ? 'active' : ''}`} onClick={() => setView('method')}>
                <BookOpen size={18} />
                <span>{t('nav.information')}</span>
            </button>

            <button className={`navItem ${view === 'settings' ? 'active' : ''}`} onClick={() => setView('settings')}>
                <Settings size={18} />
                <span>{t('nav.settings')}</span>
            </button>

            <button className={`navItem ${view === 'solver' ? 'active' : ''}`} onClick={() => setView('solver')}>
                <Calculator size={18} />
                <span>{t('nav.solver')}</span>
            </button>

            <button className={`navItem ${view === 'others' ? 'active' : ''}`} onClick={() => setView('others')}>
                <MoreHorizontal size={18} />
                <span>{t('nav.others')}</span>
            </button>
        </nav>
    )
}
import './SideNav.css';
import { useTranslation } from 'react-i18next';
import { Home, BookOpen, Settings, Calculator, MoreHorizontal, Dumbbell } from 'lucide-react';

export const SideNav = ({ view, setView }) => {
    const { t } = useTranslation();

    const navItems = [
        { key: 'home', icon: <Home size={18} />, label: t('nav.home') },
        { key: 'practice', icon: <Dumbbell size={18} />, label: t('nav.practice') },
        { key: 'information', icon: <BookOpen size={18} />, label: t('nav.information') },
        { key: 'solver', icon: <Calculator size={18} />, label: t('nav.solver') },
        { key: 'others', icon: <MoreHorizontal size={18} />, label: t('nav.others') },
        { key: 'settings', icon: <Settings size={18} />, label: t('nav.settings') }
    ];

    return (
        <nav className="sideNav">
            <div className="navLogo">📅 Weekdle</div>

            {
                navItems.map(item => (
                    <button
                        key={item.key}
                        className={`navItem ${view === item.key ? 'active' : ''}`}
                        onClick={() => setView(item.key)}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </button>
                ))
            }
        </nav>
    )
}
import './SideNav.css';

export const SideNav = ({ view, setView }) => {
    return (
        <nav className="sideNav">
            <div className="navLogo">📅 GuessDay</div>
            <button 
                className={`navItem ${view === 'practice' ? 'active' : ''}`} 
                onClick={() => setView('practice')}
            >
                Practice
            </button>
            <button 
                className={`navItem ${view === 'method' ? 'active' : ''}`} 
                onClick={() => setView('method')}
            >
                The Method
            </button>
            <button 
                className={`navItem ${view === 'settings' ? 'active' : ''}`} 
                onClick={() => setView('settings')}
            >
                Settings
            </button>
        </nav>
    )
}
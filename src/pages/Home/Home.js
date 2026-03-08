import { useTranslation } from 'react-i18next';
import { Dumbbell, BookOpen, Calculator, Target, Zap, Clock } from 'lucide-react';
import './Home.css';

export const Home = ({ setView }) => {
    const { t } = useTranslation();

    const features = [
        {
            icon: <Dumbbell className="featIcon" />,
            title: t('home.features.practice.title'),
            desc: t('home.features.practice.desc'),
            view: "practice"
        },
        {
            icon: <BookOpen className="featIcon" />,
            title: t('home.features.learn.title'),
            desc: t('home.features.learn.desc'),
            view: "information"
        },
        {
            icon: <Calculator className="featIcon" />,
            title: t('home.features.solver.title'),
            desc: t('home.features.solver.desc'),
            view: "solver"
        }
    ];

    return (
        <div className="homeContainer">
            <div className="homeContentWrapper">
                <header className="homeHero">
                    <div className="heroBadge">{t('home.hero.badge')}</div>
                    <h1>
                        {t('home.hero.titleMain')} <span className="gradientText">{t('home.hero.titleAccent')}</span>
                    </h1>
                    <p className="heroSubtitle">
                        {t('home.hero.subtitle')}
                    </p>
                    <div className="heroActions">
                        <button className="primaryBtn" onClick={() => setView('practice')}>
                            {t('home.hero.btnStart')}
                        </button>
                        <button className="secondaryBtn" onClick={() => setView('information')}>
                            {t('home.hero.btnHow')}
                        </button>
                    </div>
                </header>

                <section className="featureGrid">
                    {features.map((f, i) => (
                        <div key={i} className="featureCard" onClick={() => setView(f.view)}>
                            {f.icon}
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </section>
            </div>
            
            <footer className="homeStats">
                <div className="statItem"><Zap size={16} /><span>{t('home.footer.feedback')}</span></div>
                <div className="statItem"><Target size={16} /><span>{t('home.footer.progress')}</span></div>
                <div className="statItem"><Clock size={16} /><span>{t('home.footer.range')}</span></div>
            </footer>
        </div>
    );
};
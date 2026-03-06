import React from 'react';
import { useTranslation } from 'react-i18next';
import './Settings.css';

export const Settings = () => {
    const { t, i18n } = useTranslation();

    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div className="settingsContainer">
            <h2>{t('settings.title', 'Settings')}</h2>

            <div className="settingsList">
                {/* Language Section */}
                <div className="settingsItem">
                    <div className="settingsInfo">
                        <h3>{t('settings.language.label', 'Language')}</h3>
                        <p>{t('settings.language.desc', 'Select your preferred language')}</p>
                    </div>
                    <div className="settingsAction">
                        <select 
                        value={i18n.language} 
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        className="settingsSelect"
                        >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        </select>
                    </div>
                </div>

                {/* Future Settings Placeholder */}
                <div className="settingsItem disabled">
                    <div className="settingsInfo">
                        <h3>{t('settings.theme.label', 'Theme')}</h3>
                        <p>{t('settings.theme.desc', 'Dark mode / Light mode (Coming Soon)')}</p>
                    </div>
                    <div className="settingsAction">
                        <div className="togglePlaceholder"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
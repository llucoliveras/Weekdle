import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './Solver.css';

export const Solver = () => {
    const { t } = useTranslation();
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState(null);
    const inputRef = useRef(null);

    const handleInputChange = (e) => {
        const val = e.target.value;
        // Allow numbers and separators
        const filteredVal = val.replace(/[^0-9/.-]/g, ''); 
        setInputValue(filteredVal);

        // Split by common separators
        const parts = filteredVal.split(/[/.-]/);
        
        if (parts.length === 3) {
            const [d, m, y] = parts;
            
            // Ensure day, month, and year are not empty
            if (d && m && y) {
                // JavaScript's Date constructor interprets 2-digit years (0-99) 
                // as 1900-1999. To support years like "0050", we use setFullYear.
                const dateObj = new Date();
                dateObj.setFullYear(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10));
                
                // Check if the date is valid and the day/month haven't "rolled over"
                // (e.g., 31/04 becoming 01/05)
                if (!isNaN(dateObj.getTime()) && 
                    dateObj.getDate() === parseInt(d, 10) && 
                    dateObj.getMonth() === parseInt(m, 10) - 1) {
                    
                    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                    setResult(days[dateObj.getDay()]);
                    return;
                }
            }
        }
        setResult(null);
    };

    return (
        <div className="solverContainer">
            <div className="solverHero">
                <p className="solverLabel">{t('solver.prompt')}</p>
                
                <div className="dateInputWrapper" onClick={() => inputRef.current.focus()}>
                    <input 
                        ref={inputRef}
                        type="text" 
                        placeholder={t('solver.placeholder')}
                        className={`bigDateInput ${result ? 'valid' : ''}`}
                        onChange={handleInputChange}
                        value={inputValue}
                        spellCheck="false"
                    />
                </div>

                <div className={`solverResultSection ${result ? 'visible' : ''}`}>
                    <p className="wasA">{t('solver.resultPrefix')}</p>
                    <h1 className="solvedDay">{result ? t(`days.${result}`) : ''}</h1>
                </div>
            </div>
        </div>
    );
};
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './Solver.css';

export const Solver = ({ daysOfWeek }) => {
    const { t } = useTranslation();
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState(null);
    const [showProcess, setShowProcess] = useState(false);
    const [mathData, setMathData] = useState(null);
    const inputRef = useRef(null);

    const calculateDoomsdayProcess = (d, m, y) => {
        const year = parseInt(y, 10);
        const month = parseInt(m, 10);
        const day = parseInt(d, 10);

        // 1. Century Anchor
        const century = Math.floor(year / 100);
        const centuryAnchors = [2, 0, 5, 3]; // Tue, Sun, Fri, Wed
        const anchor = centuryAnchors[century % 4];

        // 2.1. Year Code (YY / 12) + (YY % 12) + ((YY % 12) / 4)
        const yy = year % 100;
        const a = Math.floor(yy / 12);
        const b = yy % 12;
        const c = Math.floor(b / 4);
        const yearDoomsday = (anchor + a + b + c) % 7;
        
        // 2.2. New: Odd + 11 Method Logic
        let oddStep1 = yy;
        if (oddStep1 % 2 !== 0) oddStep1 += 11;
        let oddStep2 = oddStep1 / 2;
        if (oddStep2 % 2 !== 0) oddStep2 += 11;
        let oddStep3 = 7 - (oddStep2 % 7);
        if (oddStep3 === 7) oddStep3 = 0;

        // 3. Month Doomsday (Standard dates)
        const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        const monthDoomsdays = [
            isLeap ? 4 : 3, // Jan
            isLeap ? 29 : 28, // Feb
            0, 4, 9, 6, 11, 8, 5, 10, 7, 12// Mar-Dec (using simple 4, 6, 8, 10, 12)
        ];
        // Note: For simplicity in the UI, we use the standard "even" doomsdays
        const targetDoomsday = monthDoomsdays[month-1];

        setMathData({ 
            yy, anchor, century, a, b, c, yearDoomsday, targetDoomsday, day, isLeap,
            odd1: yy, odd2: oddStep1, odd3: oddStep2, odd4: oddStep3
        });
    };

    const handleInputChange = (e) => {
        const val = e.target.value;
        const filteredVal = val.replace(/[^0-9/.-]/g, ''); 
        setInputValue(filteredVal);
        setShowProcess(false); // Hide process if they start re-typing

        const parts = filteredVal.split(/[/.-]/);
        if (parts.length === 3) {
            const [d, m, y] = parts;
            if (d && m && y) {
                const dateObj = new Date();
                dateObj.setFullYear(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10));
                
                if (!isNaN(dateObj.getTime()) && dateObj.getDate() === parseInt(d, 10)) {
                    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                    setResult(days[dateObj.getDay()]);
                    calculateDoomsdayProcess(d, m, y);
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
                    
                    <button className="processButton" onClick={() => setShowProcess(!showProcess)}>
                        {showProcess ? t('solver.hideProcess') : t('solver.showProcess')}
                    </button>
                </div>
            </div>

            {showProcess && mathData && (
                <div className="processBreakdown">
                    <h3 className="breakdownTitle">The Doomsday Method</h3>
                    
                    <div className="step">
                        <div className="stepNumber">1</div>
                        <div className="stepContent">
                            <p className="stepLabel">Century Anchor</p>
                            <p className="stepMath">The year {Math.floor(parseInt(inputValue.split(/[/.-]/)[2]) / 100)} has an anchor of <strong>{`${t(daysOfWeek[mathData.anchor-1])} (${mathData.anchor})`}</strong>.</p>
                            <small>Century codes cycle: 1800s Friday (5), 1900s Wednesday (3), 2000s Tuesday (2), 2100s Sunday (0).</small>
                        </div>
                    </div>

                    <div className="step">
                        <div className="stepNumber">2</div>
                        <div className="stepContent">
                            <p className="stepLabel">Year Logic (Choose your method)</p>
                            
                            <div className="methodsGrid">
                                {/* METHOD A */}
                                <div className="testCard">
                                    <h4 className="card-header">Method A: The 12s Rule</h4>
                                    <div className="calc-row">
                                        <span>Dozens (YY/12)</span>
                                        <strong>{mathData.a}</strong>
                                    </div>
                                    <div className="calc-row">
                                        <span>Remainder (YY%12)</span>
                                        <strong>{mathData.b}</strong>
                                    </div>
                                    <div className="calc-row">
                                        <span>Leaps (Rem/4)</span>
                                        <strong>{mathData.c}</strong>
                                    </div>
                                    <div className="calc-total">
                                        <span>Sum mod 7</span>
                                        <strong>{(mathData.a + mathData.b + mathData.c) % 7}</strong>
                                    </div>
                                </div>

                                {/* METHOD B */}
                                <div className="testCard">
                                    <h4 className="card-header">Method B: Odd + 11</h4>
                                    <div className="calc-row">
                                        <span>YY {mathData.odd1 % 2 !== 0 ? '+ 11' : ''}</span>
                                        <strong>{mathData.odd2}</strong>
                                    </div>
                                    <div className="calc-row">
                                        <span>Divide by 2</span>
                                        <strong>{mathData.odd3}</strong>
                                    </div>
                                    <div className="calc-row">
                                        <span>{mathData.odd3 % 2 !== 0 ? '+ 11' : 'Even'}</span>
                                        <strong>{mathData.odd3 % 2 !== 0 ? mathData.odd3 + 11 : mathData.odd3}</strong>
                                    </div>
                                    <div className="calc-total">
                                        <span>7 - (Sum % 7)</span>
                                        <strong>{mathData.odd4}</strong>
                                    </div>
                                </div>
                            </div>
                            
                            <p className="final-math">
                                Result: ({mathData.odd4} + Anchor {mathData.anchor}) mod 7 = <strong>{mathData.yearDoomsday}</strong>
                            </p>
                        </div>
                    </div>

                    <div className="step">
                        <div className="stepNumber">3</div>
                        <div className="stepContent">
                            <p className="stepLabel">Month's Doomsday</p>
                            <p className="stepMath">The "anchor" date for this month is <strong>{mathData.targetDoomsday}</strong>.</p>
                            <small>Common anchors: 4/4, 6/6, 8/8, 10/10, 12/12, and 7/11, 11/7, 5/9, 9/5.</small>
                        </div>
                    </div>

                    <div className="step">
                        <div className="stepNumber">4</div>
                        <div className="stepContent">
                            <p className="stepLabel">The Final Count</p>
                            <p className="stepMath">
                                Target Day ({mathData.day}) - Anchor ({mathData.targetDoomsday}) = {mathData.day - mathData.targetDoomsday} days
                            </p>
                            <p className="stepMath">
                                Move {mathData.day - mathData.targetDoomsday} days from {t(`days.${['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][mathData.yearDoomsday]}`)}.
                            </p>
                            <div className="finalVerdict">
                                Result: <strong>{result ? t(`days.${result}`) : ''}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
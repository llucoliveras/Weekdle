import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './Solver.css';

export const Solver = ({ daysOfWeek }) => {
    const { t } = useTranslation();
    const [inputValue, setInputValue] = useState('  /  /    ');
    const [result, setResult] = useState(null);
    const [mathData, setMathData] = useState(null);
    const inputRef = useRef(null);

    const calculateDoomsdayProcess = (d, m, y) => {
        const year = parseInt(y, 10);
        const month = parseInt(m, 10);
        const day = parseInt(d, 10);

        // 1. Century Anchor
        const century = Math.floor(year / 100);
        const startOfCycle = Math.floor(century / 4) * 4;
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
            yy, anchor, century, startOfCycle, month,
            a, b, c, yearDoomsday, targetDoomsday, day, isLeap,
            odd1: yy, odd2: oddStep1, odd3: oddStep2, odd4: oddStep3
        });
    };

    const handleInputChange = (e) => {
        const input = e.target;
        let value = input.value;
        let selectionStart = input.selectionStart;

        // 1. Extract only the numeric digits
        const digits = value.replace(/\D/g, '').substring(0, 8);
        
        // 2. Map digits back into the fixed mask
        let d = digits.substring(0, 2);
        let m = digits.substring(2, 4);
        let y = digits.substring(4, 8);
        
        // We pad with spaces to keep the slashes fixed
        const formatted = `${d.padEnd(2, ' ')}/${m.padEnd(2, ' ')}/${y.padEnd(4, ' ')}`;
        
        setInputValue(formatted);
        setResult(null);

        // 3. Precise Cursor Management
        // We determine if the cursor needs to skip a slash
        let newPos = selectionStart;

        // Logic: If the user just typed into a position that pushed them onto a slash
        // (index 2 or 5), we bump them to index 3 or 6.
        if (newPos === 2 || newPos === 5) {
            // Check if we are moving forward (not deleting)
            const isDeleting = e.nativeEvent.inputType?.includes('delete');
            if (!isDeleting) {
                newPos += 1;
            }
        }

        // Use requestAnimationFrame or setTimeout(0) to ensure the 
        // browser has rendered the new value before moving the cursor
        requestAnimationFrame(() => {
            input.setSelectionRange(newPos, newPos);
        });

        // 4. Validation (Remains same)
        if (digits.length >= 5) {
            const dayPart = digits.substring(0, 2);
            const monthPart = digits.substring(2, 4);
            const yearPart = digits.substring(4);

            if (dayPart.length === 2 && monthPart.length === 2) {
                const day = parseInt(dayPart, 10);
                const month = parseInt(monthPart, 10);
                const year = parseInt(yearPart, 10);

                if (day > 0 && day <= 31 && month > 0 && month <= 12 && !isNaN(year)) {
                    const dateObj = new Date();
                    dateObj.setFullYear(year, month - 1, day);

                    const isValid = 
                        dateObj.getFullYear() === year &&
                        dateObj.getMonth() === m - 1 &&
                        dateObj.getDate() === day;

                    if (isValid) {
                        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                        setResult(days[dateObj.getDay()]);
                        calculateDoomsdayProcess(dayPart, monthPart, yearPart);
                    }
                }
            }
        }
    };

    const handleKeyDown = (e) => {
        const { selectionStart } = e.target;
        
        // Custom Backspace logic to "jump" over slashes
        if (e.key === 'Backspace') {
            if (selectionStart === 3 || selectionStart === 6) {
                // Force selection to before the slash so the next digit is deleted
                e.target.setSelectionRange(selectionStart - 1, selectionStart - 1);
            }
        }
    };

    const getMonthRule = (month, isLeap) => {
        const rules = {
            even: "The Even Months: 4/4, 6/6, 8/8, 10/10, 12/12 (Easy pairs!)",
            flip: "9-to-5 at 7-11: 5/9 & 9/5, 7/11 & 11/7 (The flip dates!)",
            pi: "The Pi Day: March 14 (3/14 or \"March 0\")"
        };

        if ([1, 2].includes(month)) return `The Others: Jan ${isLeap ? '4 (Leap year adjustment)' : '3'} & Feb ${isLeap ? '29' : '28'} (Last day of Feb)`;
        if (month === 3) return rules.pi;
        if ([4, 6, 8, 10, 12].includes(month)) return rules.even;
        if ([5, 9, 7, 11].includes(month)) return rules.flip;

        return "";
    };

    return (
        <div className="solverContainer">
            <div className="solverHero">
                <p className="solverLabel">{t('solver.prompt')}</p>
                <div className="dateInputWrapper" onClick={() => inputRef.current.focus()}>
                    <input 
                        ref={inputRef}
                        type="text" 
                        inputMode="numeric"
                        placeholder="DD/MM/YYYY"
                        className={`bigDateInput ${result ? 'valid' : ''}`}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        value={inputValue}
                        spellCheck="false"
                    />
                </div>
            </div>

            {result && mathData && (
                <div className="processBreakdown">
                    <h3 className="breakdownTitle">The Doomsday Method</h3>
                    
                    <div className="step">
                        <div className="stepNumber">1</div>
                        <div className="stepContent">
                            <p className="stepLabel">Century Anchor</p>
                            <p className="stepMath">The year {mathData.century + (mathData.century !== 0 ? '00' : '')} has an anchor of <strong>{`${t(daysOfWeek[mathData.anchor-1])} (${mathData.anchor})`}</strong>.</p>
                            <small>
                                Century codes cycle: {` `}
                                {mathData.startOfCycle}{mathData.startOfCycle !== 0 ? '00' : ''}s {t('days.tuesday')} (2), {` `}
                                {mathData.startOfCycle + 1}00s {t('days.sunday')} (0), {` `}
                                {mathData.startOfCycle + 2}00s {t('days.friday')} (5), {` `}
                                {mathData.startOfCycle + 3}00s {t('days.wednesday')} (3).
                            </small>
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
                            <p className="stepMath">
                                The "anchor" date for this month is <strong>{mathData.targetDoomsday}/{mathData.month}</strong>.
                            </p>
                            <small className="monthRule">
                                {getMonthRule(mathData.month, mathData.isLeap)}
                            </small>
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
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Solver.css';
import DateInput from './DateInput';

export const Solver = ({ daysOfWeek }) => {
    const { t } = useTranslation();
    const [mathData, setMathData] = useState(null);

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

        const dayOfWeekIndex = (yearDoomsday + day - targetDoomsday + 70) % 7;

        setMathData({ 
            yy, anchor, century, startOfCycle, month,
            a, b, c, yearDoomsday, targetDoomsday, day, isLeap, dayOfWeekIndex,
            odd1: yy, odd2: oddStep1, odd3: oddStep2, odd4: oddStep3
        });
    };

    const getTranslatedMonthRule = (month, isLeap) => {
        if ([1, 2].includes(month)) {
            return t('solver.step3.rules.others', {
                janVal: isLeap ? '4' : '3',
                janAdj: isLeap ? ` (${t('solver.step3.leapYear')})` : '',
                febVal: isLeap ? '29' : '28'
            });
        }
        if (month === 3) return t('solver.step3.rules.pi');
        if ([4, 6, 8, 10, 12].includes(month)) return t('solver.step3.rules.even');
        if ([5, 9, 7, 11].includes(month)) return t('solver.step3.rules.flip');
        return "";
    };

    return (
        <div className="solverContainer">
            <div className="solverHero">
                <p className="solverLabel">{t('solver.prompt')}</p>
                <DateInput calculateDoomsdayProcess={calculateDoomsdayProcess} />
            </div>

            {mathData && (
                <div className="processBreakdown">
                    <h3 className="breakdownTitle">{t('solver.methodName')}</h3>
                    
                    <div className="step">
                        <div className="stepNumber">1</div>
                        <div className="stepContent">
                            <p className="stepLabel">{t('solver.step1.label')}</p>
                            <p className="stepMath" dangerouslySetInnerHTML={{ __html: t('solver.step1.math', {
                                century: `${mathData.century}${mathData.century !== 0 ? '00' : ''}`,
                                day: t(`${daysOfWeek[mathData.anchor === 0 ? 6 : mathData.anchor - 1]}`),
                                code: mathData.anchor
                            }) }}/>
                            <small>
                                {t('solver.step1.cycle')} {` `}
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
                            <p className="stepLabel">{t('solver.step2.label')}</p>
                            
                            <div className="methodsGrid">
                                {/* METHOD A */}
                                <div className="testCard">
                                    <h4 className="card-header">{t('solver.step2.methodA')}</h4>
                                    <div className="calc-row">
                                        <span>{t('solver.step2.dozens')}</span>
                                        <strong>{mathData.a}</strong>
                                    </div>
                                    <div className="calc-row">
                                        <span>{t('solver.step2.remainder')}</span>
                                        <strong>{mathData.b}</strong>
                                    </div>
                                    <div className="calc-row">
                                        <span>{t('solver.step2.leaps')}</span>
                                        <strong>{mathData.c}</strong>
                                    </div>
                                    <div className="calc-total">
                                        <span>{t('solver.step2.sumMod')}</span>
                                        <strong>{(mathData.a + mathData.b + mathData.c) % 7}</strong>
                                    </div>
                                </div>

                                {/* METHOD B */}
                                <div className="testCard">
                                    <h4 className="card-header">{t('solver.step2.methodB')}</h4>
                                    <div className="calc-row">
                                        <span>{t('abbreviations.YY')} {mathData.odd1 % 2 !== 0 ? '+ 11' : ''}</span>
                                        <strong>{mathData.odd2}</strong>
                                    </div>
                                    <div className="calc-row">
                                        <span>{t('solver.step2.divide2')}</span>
                                        <strong>{mathData.odd3}</strong>
                                    </div>
                                    <div className="calc-row">
                                        <span>{mathData.odd3 % 2 !== 0 ? '+ 11' : t('solver.step2.even')}</span>
                                        <strong>{mathData.odd3 % 2 !== 0 ? mathData.odd3 + 11 : mathData.odd3}</strong>
                                    </div>
                                    <div className="calc-total">
                                        <span>{t('solver.step2.formula')}</span>
                                        <strong>{mathData.odd4}</strong>
                                    </div>
                                </div>
                            </div>
                            
                            <p className="final-math" dangerouslySetInnerHTML={{ __html: t('solver.step2.finalYearResult', {
                                val: mathData.odd4,
                                anchor: mathData.anchor,
                                result: mathData.yearDoomsday
                            }) }} />
                        </div>
                    </div>

                    <div className="step">
                        <div className="stepNumber">3</div>
                        <div className="stepContent">
                            <p className="stepLabel">{t('solver.step3.label')}</p>
                            <p className="stepMath" dangerouslySetInnerHTML={{ __html: t('solver.step3.anchorDate', {
                                day: mathData.targetDoomsday,
                                month: mathData.month
                            }) }} />
                            <small className="monthRule">
                                {getTranslatedMonthRule(mathData.month, mathData.isLeap)}
                            </small>
                        </div>
                    </div>

                    <div className="step">
                        <div className="stepNumber">4</div>
                        <div className="stepContent">
                            <p className="stepLabel">{t('solver.step4.label')}</p>
                            <p className="stepMath">
                                {t('solver.step4.targetMinusAnchor', { day: mathData.day, anchor: mathData.targetDoomsday, diff: mathData.day - mathData.targetDoomsday })}
                            </p>
                            <p className="stepMath">
                                {t('solver.step4.moveDays', { 
                                    diff: mathData.day - mathData.targetDoomsday, 
                                    dayName: t(`days.${['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][mathData.yearDoomsday]}`) 
                                })}
                            </p>
                            <div className="finalVerdict" dangerouslySetInnerHTML={{ __html: t('solver.step4.finalVerdict', {
                                result: t(`${daysOfWeek[mathData.dayOfWeekIndex]}`)
                            }) }} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
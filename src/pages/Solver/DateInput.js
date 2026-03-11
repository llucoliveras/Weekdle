import { useRef, useState, useEffect } from 'react';
import './DateInput.css';

const DateInput = ({ calculateDoomsdayProcess }) => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const dayRef = useRef(null);
    const monthRef = useRef(null);
    const yearRef = useRef(null);

    const isValidDate = day > 0 && day <= 31 && month > 0 && month <= 12 && year > 0;

    useEffect(() => {
        if (isValidDate) calculateDoomsdayProcess(day, month, year);
    }, [isValidDate, day, month, year]);

    const [widths, setWidths] = useState({ day: 2.1, month: 2.7, year: 4.5});

    const getInputWidth = (value, width) => {
        const length = value.length > 0 ? value.length : width;

        return `calc(${length}ch + ${length * 0.15}ch)`;
    };

    console.log(getInputWidth(day, widths.day))

    const handleKeyDown = (e, currentRef, prevRef, nextRef) => {
        const { selectionStart, value } = e.target;

        switch (e.key) {
            case 'ArrowRight':
                if (selectionStart === value.length && nextRef) {
                    e.preventDefault();
                    nextRef.current.focus();
                    setTimeout(() => nextRef.current.setSelectionRange(0, 0), 0);
                }
                break;
            case 'ArrowLeft':
                if (selectionStart === 0 && prevRef) {
                    e.preventDefault();
                    prevRef.current.focus();
                    const prevLen = prevRef.current.value.length;
                    setTimeout(() => prevRef.current.setSelectionRange(prevLen, prevLen), 0);
                }
                break;
            case 'Backspace':
                if (value === '' && prevRef) {
                    e.preventDefault();
                    prevRef.current.focus();
                }
                break;
            default:
                break;
        }
    };

    const handleChange = (e, setter, nextRef, maxLength) => {
        const val = e.target.value.replace(/\D/g, '');
        setter(val);
        if (val.length >= maxLength && nextRef) {
            nextRef.current.focus();
        }
    };

    return (
        <div className={`dateInputWrapper ${isValidDate ? 'isValid' : ''}`}>
            <input
                ref={dayRef}
                type="text"
                className="dateField"
                placeholder="DD"
                maxLength="2"
                value={day}
                style={{ width: getInputWidth(day, widths.day) }}
                onChange={(e) => handleChange(e, setDay, monthRef, 2)}
                onKeyDown={(e) => handleKeyDown(e, dayRef, null, monthRef)}
            />

            <span className="dateDivider">/</span>

            <input
                ref={monthRef}
                type="text"
                className="dateField"
                placeholder="MM"
                maxLength="2"
                value={month}
                style={{ width: getInputWidth(month, widths.month) }}
                onChange={(e) => handleChange(e, setMonth, yearRef, 2)}
                onKeyDown={(e) => handleKeyDown(e, monthRef, dayRef, yearRef)}
            />

            <span className="dateDivider">/</span>

            <input
                ref={yearRef}
                type="text"
                className="dateField"
                placeholder="YYYY"
                value={year}
                style={{ width: getInputWidth(year, widths.year) }}
                onChange={(e) => handleChange(e, setYear, null, 4)}
                onKeyDown={(e) => handleKeyDown(e, yearRef, monthRef, null)}
            />
        </div>
    );
};

export default DateInput;
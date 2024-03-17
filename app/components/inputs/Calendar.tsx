'use client';

import { DateRange, DateRangePicker, Range, RangeKeyDict, defaultInputRanges, defaultStaticRanges } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface CalendarProps {
    value: Range,
    onChange: (value: RangeKeyDict) => void;
}

// const staticRanges = [defaultStaticRanges[2], defaultStaticRanges[4]];
const inputRanges = [defaultInputRanges[1]];


const Calendar: React.FC<CalendarProps> = ({
    value,
    onChange,
}) => {
    return (
        <DateRangePicker
            rangeColors={['#262626']}
            ranges={[value]}
            date={new Date()}
            onChange={onChange}
            direction="vertical"
            showDateDisplay={false}
            minDate={new Date()}
            staticRanges={[]}
            inputRanges={inputRanges}
        />
    );
}

export default Calendar;

'use client';

import { Range } from "react-date-range";

import Button from "../Button";
import Calendar from "../inputs/Calendar";

interface CalendarPartProps {
  dateRange: Range,
  onChangeDate: (value: Range) => void;
//   onSubmit: () => void;
  disabled?: boolean;
}

const CalendarPart: React.FC<CalendarPartProps> = ({
  dateRange,
  onChangeDate,
//   onSubmit,
  disabled,
  
}) => {
  return ( 
    
      <Calendar
        value={dateRange}
        onChange={(value) => onChangeDate(value.selection)}
      />
   );
}
 
export default CalendarPart;
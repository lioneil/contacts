import { useEffect, useState } from 'react';
import Calendar from './Calendar';
import moment from 'moment';

export default function Calendars ({ onRangeUpdate }) {
  const [ currentSelection, setCurrentSelection ] = useState('startDate');

  const [ startDate, setStartDate ] = useState();
  const [ endDate, setEndDate ] = useState();

  const [ startMonth, setStartMonth ] = useState(moment(endDate).add('-1', 'month').toDate());
  const [ endMonth, setEndMonth ] = useState(moment(endDate).toDate());

  const onDateClick = ({ day }) => {
    if (currentSelection === 'startDate') {
      setStartDate(day);
    }

    if (currentSelection === 'endDate') {
      setEndDate(day);
    }

    setCurrentSelection(prev => prev === 'startDate' ? 'endDate' : 'startDate');
  };

  useEffect(() => {
    if (startDate > endDate) {
      setStartDate(endDate);
      setEndDate(startDate);
      setCurrentSelection(prev => prev === 'startDate' ? 'endDate' : 'startDate');
    }

    onRangeUpdate({ startDate, endDate });
  }, [ startDate, endDate ])

  return (
    <div>
      <div className="flex justify-between min-h-[340px]">
        <Calendar
          month={startMonth}
          setMonth={setStartMonth}
          onDateClick={onDateClick}
          startDate={startDate}
          endDate={endDate}
          currentSelection={currentSelection}
          className="border-r"
        />
        <div className="min-h-[340px] w-[1px] bg-gray-200"></div>
        <Calendar
          month={endMonth}
          setMonth={setEndMonth}
          onDateClick={onDateClick}
          startDate={startDate}
          endDate={endDate}
          currentSelection={currentSelection}
        />
      </div>
    </div>
  );
};

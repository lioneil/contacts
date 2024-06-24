import moment from 'moment';
import { useEffect, useState } from 'react';
import ChevronRightIcon from '@/components/Icons/ChevronRightIcon.jsx';
import ChevronLeftIcon from '@/components/Icons/ChevronLeftIcon.jsx';

export default function Calendar ({ month, setMonth, onDateClick, startDate, endDate, currentSelection }) {
  const [ days, setDays ] = useState([]);
  const [ currentMonth, setCurrentMonth ] = useState(month.getMonth());
  const [ currentYear, setCurrentYear ] = useState(month.getFullYear());

  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  // Generate days for the current month
  function generateDaysForMonth () {
    setCurrentMonth(month.getMonth());
    setCurrentYear(month.getFullYear());
    console.log(12, 'dd');
  }

  function isInRange (day) {
    const currentDay = moment(day).format('YYYY-MM-DD');
    const startDay = moment(startDate).format('YYYY-MM-DD');
    const endDay = moment(endDate).format('YYYY-MM-DD');
    return currentDay >= startDay && currentDay <= endDay;
  };

  function isStartDay (day) {
    const currentDay = moment(day).format('YYYY-MM-DD');
    const startDay = moment(startDate).format('YYYY-MM-DD');
    return currentDay === startDay;
  }

  function isEndDay (day) {
    const currentDay = moment(day).format('YYYY-MM-DD');
    const endDay = moment(endDate).format('YYYY-MM-DD');
    return currentDay === endDay;
  }

  function onDayClick (day) {
    onDateClick({ day });
  }

  function setToPreviousMonth () {
    const newMonth = moment(month).add('-1', 'month').toDate();
    setMonth(newMonth);
  }

  function setToNextMonth () {
    const newMonth = moment(month).add('+1', 'month').toDate();
    setMonth(newMonth);
  }

  useEffect(() => {
    generateDaysForMonth();
    setDays(getDaysInMonth(currentYear, currentMonth));
  }, [ month ]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <button className="p-2" onClick={() => setToPreviousMonth()}>
          <ChevronLeftIcon/>
        </button>
        <h2 className="font-bold">{month.toLocaleString('default', { month: 'long' })} {currentYear}</h2>
        <button className="p-2" onClick={() => setToNextMonth()}>
          <ChevronRightIcon/>
        </button>
      </div>
      <div className="grid grid-cols-7">
        {days.map((day, index) => (
          <div className="calendar-day-area">
            <div
              key={index}
              className={`calendar-day-area-text w-[40px] h-[40px] text-center p-2 ${isInRange(day) ? 'bg-[#EAECF8]' : ''} ${isStartDay(day) || isEndDay(day) ? 'rounded-full bg-[#EE2B7E] text-white' : ''}`}
              role="button"
              onClick={() => onDayClick(day)}
            >
              {day.getDate()}
            </div>
            {(isStartDay(day) || isEndDay(day)) && (<span
              className={`indicator-active bg-[#EAECF8] w-[20px] h-[40px] ${isStartDay(day) ? 'indicator-active--start' : ''} ${isEndDay(day) ? 'indicator-active--end' : ''}`}></span>)}
          </div>
        ))}
      </div>
    </div>
  );
};

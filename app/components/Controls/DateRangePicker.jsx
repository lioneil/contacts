import { useEffect, useRef, useState } from 'react';
import Calendars from '@/components/Controls/Calendars.jsx';
import moment from 'moment';

export default function DateRangePicker ({ onUpdate }) {
  const [ showPicker, setShowPicker ] = useState(false);
  const dropdownRef = useRef(null);

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const onClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowPicker(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', onClickOutside);

    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  }, []);

  const [ range, setRange ] = useState({
    startDate: null,
    endDate: null,
    text: '',
  });

  function onRangeUpdate ({ startDate, endDate }) {
    setRange({
      startDate,
      endDate,
      text: range.startDate
        ? `${moment(range.startDate).format('MMM-DD-YYYY')} - ${moment(range.endDate).format('MMM-DD-YYYY')}`
        : '',
    });
  }

  function onCancel () {
    setShowPicker(prevState => !prevState);
  }

  function onApply () {
    setShowPicker(prevState => !prevState);
    onUpdate && onUpdate({
      startDate: moment(range.startDate).format('YYYY-MM-DD'),
      endDate: moment(range.endDate).format('YYYY-MM-DD'),
    });
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Date Field */}
      <input
        type="text"
        readOnly
        placeholder="Select Date Range"
        className="input-control w-[230px] cursor-pointer"
        value={range.text}
        onClick={togglePicker}
      />

      {/* Dropdown */}
      {showPicker && (
        <div
          className="absolute z-10 top-full right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">

          <div className="min-w-[624px]">
            <Calendars onRangeUpdate={onRangeUpdate}/>
          </div>
          <div className="flex justify-between items-center p-4 border-t">
            <div className="flex items-center gap-3 w-[50%]">
              <input
                type="text"
                placeholder="Start Date"
                readOnly
                className="input-control w-full"
                value={moment(range.startDate).format('MMM DD, YYYY')}
              />
              <span>–</span>
              <input
                type="text"
                placeholder="End Date"
                readOnly
                className="input-control w-full"
                value={moment(range.endDate).format('MMM DD, YYYY')}
              />
            </div>
            <div className="flex gap-3">
              <button onClick={onCancel} className="btn-default !shadow-none">Cancel</button>
              <button onClick={onApply} className="btn-default bg-[#4D60C5] text-white !shadow-none">Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

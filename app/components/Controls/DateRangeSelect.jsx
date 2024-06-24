import { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import moment from 'moment';

export default function DateRangeSelect ({ onUpdateValue, years = 10, year = moment().format('Y') }) {
  const [ value, setValue ] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11)
  });

  const shortcuts = [ ...Array(years) ].reduce((acc, _, i) => {
    const y = year - i;
    acc[`year${y}`] = {
      text: y.toString(),
      period: {
        start: `${y}-01-01`,
        end: `${y}-12-30`
      },
    };
    return acc;
  }, {});

  const handleValueChange = (newValue) => {
    setValue(newValue);
    onUpdateValue(newValue);
  }

  return (
    <div className="max-w-[200px] rounded border border-lg border-grey-300 shadow-[0px_1px_0px_0px_#E2E3E680]">
      <Datepicker
        primaryColor={'violet'}
        showShortcuts={true}
        showFooter={true}
        configs={{ shortcuts }}
        value={value}
        onChange={handleValueChange}
      />
    </div>
  );
};

import { get } from 'lodash';
import moment from 'moment';
import ArrowRightIcon from '@/components/Icons/ArrowRightIcon';
import ArrowLeftIcon from '@/components/Icons/ArrowLeftIcon';
import { isNil } from 'lodash/lang.js';

export default function DataTable ({
                                     title,
                                     headers,
                                     items,
                                     meta,
                                     loading,
                                     actions,
                                     currentHistoryIndex,
                                     setCurrentHistoryIndex,
                                     onPageChange
                                   }) {
  const paging = {
    currentPage: currentHistoryIndex + 1,
    ...meta,
  }

  const onPrevious = () => {
    setCurrentHistoryIndex(currentIndex => currentIndex - 1);
  };

  const onNext = () => {
    setCurrentHistoryIndex(currentIndex => currentIndex + 1);
  };

  const renderPagination = () => {
    // const pages = [];
    // for (let i = 1; i <= totalPages; i++) {
    //   pages.push(
    //     <button
    //       key={i}
    //       onClick={() => onPageChange(i)}
    //       className={`px-2 py-1 mx-1 rounded ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
    //     >
    //       {i}
    //     </button>
    //   );
    // }
    // return pages;
    return [];
  };

  function formatIfValid (text, type = null) {
    if (type && type === 'date') {
      if (moment(text, moment.ISO_8601, true).isValid()) {
        return moment(text, moment.ISO_8601).format('MM/DD/YYYY');
      }
    }

    return text;
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="px-4 py-4 flex align-items-center justify-between">
        <h2 className="text-2xl font-bold">{title || 'Data'}</h2>
        {actions}
      </div>
      <table className="min-w-full bg-white">
        <thead>
        <tr>
          {headers.map((header) => <th key={header.key}
                                       className="py-2 px-4 border-t border-b text-left min-w-[100px] bg-gray-100">{header.title}</th>)}
        </tr>
        </thead>
        <tbody>
        {loading ? (
          <tr>
            <td colSpan={headers.length} className="py-2 px-4 border-b text-center opacity-50">Loading</td>
          </tr>
        ) : items.map((item, index) =>
          <tr key={index}>
            {headers.map((header) => (
              item.content ? item.content :
                <td className="py-2 px-4 border-b">{formatIfValid(get(item, header.key), header.type)}</td>
            ))}
          </tr>
        )}
        </tbody>
      </table>
      <div className="flex items-center justify-between p-4">
        <button
          onClick={onPrevious}
          className="flex gap-3 justify-content-center font-inter text-sm font-semibold leading-5 text-center box-border px-3.5 py-2 w-auto h-[36px] bg-white border border-gray-300 shadow-sm rounded-md disabled:shadow-none disabled:opacity-50"
          disabled={paging.currentPage == 1}
        >
          <ArrowLeftIcon/>
          Previous
        </button>
        <div className="flex">{renderPagination()}</div>
        <button
          onClick={onNext}
          className="flex gap-3 justify-content-center font-inter text-sm font-semibold leading-5 text-center box-border px-3.5 py-2 w-auto h-[36px] bg-white border border-gray-300 shadow-sm rounded-md disabled:shadow-none disabled:opacity-50"
          disabled={isNil(paging.after)}
        >
          <span>Next</span>
          <ArrowRightIcon/>
        </button>
      </div>
    </div>
  );
};

import DataTable from '@/components/Data/DataTable';
import DateRangeSelect from '@/components/Controls/DateRangeSelect';
import DateRangeSelectbackup from '@/components/Controls/DateRangeSelectbackup';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Calendars from '@/components/Controls/Calendars.jsx';

export default function Contacts () {
  const query = new URLSearchParams(useLocation().search);

  const [ meta, setMeta ] = useState({
    limit: query.get('limit') || 10,
    range: { startDate: query.get('start') || null, endDate: query.get('end') || null },
    offset: 0,
    after: null,
    history: [ null ],
    total: 0,
  });

  const [ currentHistoryIndex, setCurrentHistoryIndex ] = useState(0);

  const [ contacts, setContacts ] = useState({
    loading: true,
    headers: [
      { key: 'properties.email', title: 'Email' },
      { key: 'properties.firstname', title: 'First Name' },
      { key: 'properties.lastname', title: 'Last Name' },
      { key: 'properties.createdate', title: 'Customer Date', type: 'date' },
      { key: 'properties.leaddate', title: 'Lead Date' },
    ],
    results: [],
    paging: {
      current: 1,
      limit: 1,
      offset: 0,
      after: null,
    },
  });

  async function getContactsList () {
    setContacts({ ...contacts, loading: true });
    const { data } = await axios.get(`/api/contacts/list.php`, {
      params: {
        limit: meta.limit,
        range: meta.range,
        after: meta.history?.[currentHistoryIndex],
      }
    });

    setContacts({
      ...contacts,
      ...data,
      loading: false,
    });

    setMeta({
      ...meta,
      total: data.total,
      after: data.paging?.next?.after,
      history: meta.history.concat([ data?.paging?.next?.after ]),
    });
  }

  useEffect(() => {
    getContactsList();
  }, [ currentHistoryIndex, meta.range ]);

  function onUpdateDateRange (dates) {
    setMeta({ ...meta, range: dates });
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Contacts</h1>
      <DataTable
        headers={contacts.headers}
        items={contacts.results}
        loading={contacts.loading}
        meta={meta}
        currentHistoryIndex={currentHistoryIndex}
        setCurrentHistoryIndex={setCurrentHistoryIndex}
        actions={(
          <DateRangeSelect onUpdateValue={onUpdateDateRange}/>
        )}
      />
    </>
  );
}

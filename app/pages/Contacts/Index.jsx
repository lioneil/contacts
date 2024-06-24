import DataTable from '@/components/Data/DataTable';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Contacts () {
  const [ meta, setMeta ] = useState({
    limit: 1,
    offset: 0,
    after: null,
    history: [ null ],
  });
  const [ currentHistoryIndex, setCurrentHistoryIndex ] = useState(0);

  const [ contacts, setContacts ] = useState({
    loading: true,
    headers: [
      { key: 'properties.email', title: 'Email' },
      { key: 'properties.firstname', title: 'First Name' },
      { key: 'properties.lastname', title: 'Last Name' },
      { key: 'properties.createdate', title: 'Customer Date', type: 'date' },
      // { key: 'TODO: look in docs', title: 'Lead Date' },
    ],
    results: [],
    paging: {
      current: 1,
      limit: 1,
      offset: 0,
      after: null,
    },
  });

  async function getContactsList ({ limit, offset }) {
    setContacts({ ...contacts, loading: true });
    const { data } = await axios.get(`/api/contacts/list.php`, {
      params: {
        limit,
        offset,
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
      ...data.paging,
      history: meta.history.concat([ data?.paging?.next?.after ]),
    });

    console.log(180, currentHistoryIndex, meta.history?.[currentHistoryIndex])
  }

  useEffect(() => {
    getContactsList({ limit: meta.limit, offset: meta.offset });
  }, [ currentHistoryIndex ]);

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Contacts</h1>
      <DataTable
        headers={contacts.headers}
        items={contacts.results}
        loading={contacts.loading}
        paging={contacts.paging}
        currentHistoryIndex={currentHistoryIndex}
        setCurrentHistoryIndex={setCurrentHistoryIndex}
      />
    </>
  );
}

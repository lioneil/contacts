import { useState } from 'react';
import axios from 'axios';

export default function HubSpotConnectBtn () {
  const [url, setUrl] = useState();

  async function onSubmit (e) {
    e.preventDefault();

    const { data } = await axios.get(`/api/hubspot/connect.php`);
    setUrl(data.url);

    window.location = data.url;
  }

  return (
    <>
      <form method="post" onSubmit={onSubmit}>
        <button
          type="submit"
          className="block text-center w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Connect to HubSpot
        </button>
      </form>
    </>
  )
}

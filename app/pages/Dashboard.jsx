import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <div className="flex flex-col space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Welcome to your dashboard</h2>
          <p className="mt-2 text-gray-600">Here you can manage your data and view contacts.</p>
        </div>

        <div className="p-6 bg-white rounded shadow-md">
          <h2 className="text-xl font-semibold">Quick Links</h2>
          <div className="mt-2">
            <Link to="/contacts" className="text-blue-500 hover:underline">Contacts</Link>
          </div>
        </div>
      </div>
    </>
  );
}

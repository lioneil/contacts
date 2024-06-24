import { Link, Outlet } from 'react-router-dom';

export default function MainLayout () {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white">
        <nav className="container mx-auto p-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/dashboard" className="hover:text-gray-400">Dashboard</Link>
            </li>
            <li>
              <Link to="/contacts" className="hover:text-gray-400">Contacts</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto p-4 text-center">
          <p>© 2024 John Lioneil Dionisio</p>
        </div>
      </footer>
    </div>
  );
}

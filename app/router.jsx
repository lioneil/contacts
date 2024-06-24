import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import MainLayout from './layouts/MainLayout';
import ContactsIndex from './pages/Contacts/Index.jsx';
import IsAuthenticated from './middleware/IsAuthenticated.jsx';
import RedirectToDashboardIfAuthenticated from './middleware/RedirectToDashboardIfAuthenticated.jsx';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={
          <RedirectToDashboardIfAuthenticated>
            <Index/>
          </RedirectToDashboardIfAuthenticated>
        }/>
        <Route element={
          <IsAuthenticated>
            <MainLayout />
          </IsAuthenticated>
        }>
          <Route exact path="/dashboard" element={<Dashboard/>} />
          <Route exact path="/contacts" element={<ContactsIndex/>} />
        </Route>
        {/*<Route path="*" element={<PageNotFound/>}/>*/}
      </Routes>
    </Router>
  );
}

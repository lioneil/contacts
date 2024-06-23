import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index/>} />
        {/*<Route path="*" element={<Index/>}/>*/}
      </Routes>
    </Router>
  );
}

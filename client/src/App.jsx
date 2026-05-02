 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import CreateTask from './pages/CreateTask';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
// Future pages: CreateTask, Dashboard, History

export default function App() {
  return (
    <Router>
      <div className="max-w-[450px] mx-auto bg-black min-h-screen shadow-2xl">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}

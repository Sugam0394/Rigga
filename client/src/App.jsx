import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Chat from "./pages/Chat";
import Task from "./pages/Task";
import History from "./pages/History";
import Proof from "./pages/Proof";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/task" element={<Task />} />
        <Route path="/history" element={<History />} />
        <Route path="/proof" element={<Proof />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

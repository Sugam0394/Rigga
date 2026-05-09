 import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import Chat from "./pages/Chat/Chat";
import Task from "./pages/Task/Task";
import History from "./pages/History/History";
import Proof from "./pages/Proof/Proof";
import CreateTask from "./pages/CreateTask/CreateTask";

import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

 
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
 


 function App() {

  return (
    <Routes>

      {/* PUBLIC ROUTES */}

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />


      {/* PROTECTED ROUTES */}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Landing />
          </ProtectedRoute>
        }
      />

      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />

      <Route
        path="/task"
        element={
          <ProtectedRoute>
            <Task />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />

      <Route
        path="/proof"
        element={
          <ProtectedRoute>
            <Proof />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <CreateTask />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;

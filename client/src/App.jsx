 import { Routes, Route , Navigate } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import Chat from "./pages/Chat/Chat";
import Task from "./pages/Task/Task";
import History from "./pages/History/History";
import CreateTask from "./pages/CreateTask/CreateTask";
import ChallengeLibrary from "./pages/Challenge/Library";
import ChallengeDetail from "./pages/Challenge/ChallengeDetail";
import Subscribe from "./pages/Subscribe/Subscribe";

import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

 
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

import "./App.css";
 


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
        path="/create"
        element={
          <ProtectedRoute>
            <CreateTask />
          </ProtectedRoute>
        }
      />

      <Route
  path="/challenges"
  element={
    <ProtectedRoute>
      <ChallengeLibrary />
    </ProtectedRoute>
  }
/>

<Route
  path="/challenges/:id"
  element={
    <ProtectedRoute>
      <ChallengeDetail />
    </ProtectedRoute>
  }
/>
<Route
  path="/subscribe"
  element={
    <ProtectedRoute>
      <Subscribe />
    </ProtectedRoute>
  }
/>

 {/* ✅ Catch all */}
  <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default App;

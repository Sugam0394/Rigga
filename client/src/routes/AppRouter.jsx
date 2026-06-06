import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import AppLayout from "../layouts/AppLayout";
import PublicLayout from "../layouts/PublicLayout";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}

        <Route element={<AuthLayout />}>
  <Route path="/" />
  <Route path="/login"  />
  <Route path="/verify-otp"/>
</Route>

        <Route
          path="/review/:token"
          element={
            <PublicLayout />
          }
        />

        {/* Protected Routes */}

        <Route
          path="/home"
          element={
            <AppLayout />
          }
        />

        <Route
          path="/challenges/create"
          element={
            <AppLayout />
          }
        />

        <Route
          path="/challenges/:id"
          element={
            <AppLayout />
          }
        />

        <Route
          path="/profile"
          element={
            <AppLayout />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
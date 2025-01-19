import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/LoginForm';
import Employees from './pages/Employees';
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Warehouses from "./pages/Warehouses";
import PrivateRoute from "./components/PrivateRoute";
import AccessDenied from "./pages/AccessDenied";
import Ships from "./pages/Ships";
import Terminals from "./pages/Terminals";
import NotFound from "./pages/NotFound";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/employees" element={
              <PrivateRoute allowedRoles={["ROLE_ADMIN"]}>
                  <Employees />
              </PrivateRoute>
          }
          />
          <Route path="/ships" element={
              <PrivateRoute allowedRoles={["ROLE_ADMIN","ROLE_MAINTAINER"]}>
                  <Ships />
              </PrivateRoute>
          }
          />
          <Route path="/terminals" element={
              <PrivateRoute allowedRoles={["ROLE_ADMIN", "ROLE_HANDLER"]}>
                  <Terminals />
              </PrivateRoute>
          }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={
                   <PrivateRoute allowedRoles={["ROLE_ADMIN"]}>
                       <Admin />
                   </PrivateRoute>
               }
          />
          <Route path="/warehouses"
                 element={
                     <PrivateRoute allowedRoles={["ROLE_WAREHOUSE", "ROLE_ADMIN"]}>
                        <Warehouses />
                     </PrivateRoute>} />

          <Route path="/access-denied"  element={<AccessDenied />} />
            <Route path="*"  element={<NotFound />} />
        </Routes>
      </Router>
  );
}

export default App;

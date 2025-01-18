import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/LoginForm';
import Employees from './pages/Employees';
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Warehouse from "./pages/Warehouse";
import Maintainer from "./pages/Maintainer";
import PrivateRoute from "./components/PrivateRoute";
import AccessDenied from "./pages/AccessDenied";
import Handler from "./pages/Handler";
import Ships from "./pages/Ships";
import Terminals from "./pages/Terminals";
import NotFound from "./pages/NotFound";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/ships" element={<Ships />} />
          <Route path="/terminals" element={<Terminals />} />
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
                        <Warehouse />
                     </PrivateRoute>} />
          <Route path="/maintainer"
                element={
                    <PrivateRoute allowedRoles={["ROLE_MAINTAINER", "ROLE_ADMIN"]}>
                        <Maintainer />
                    </PrivateRoute>
                }
          />
          <Route path="/handler"
                 element={
                     <PrivateRoute allowedRoles={["ROLE_HANDLER", "ROLE_ADMIN"]}>
                         <Handler />
                     </PrivateRoute>
                 }
          />
          <Route path="/access-denied"  element={<AccessDenied />} />
            <Route path="*"  element={<NotFound />} />
        </Routes>
      </Router>
  );
}

export default App;

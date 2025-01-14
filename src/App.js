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

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={
                   <PrivateRoute allowedRole="ROLE_ADMIN">
                       <Admin />
                   </PrivateRoute>
               }
          />
          <Route path="/warehouse"
                 element={
                     <PrivateRoute allowedRole="ROLE_WAREHOUSE">
                        <Warehouse />
                     </PrivateRoute>} />
          <Route path="/maintainer"
                element={
                    <PrivateRoute allowedRole="ROLE_MAINTAINER">
                        <Maintainer />
                    </PrivateRoute>
                }
          />
          <Route path="/handler"
                 element={
                     <PrivateRoute allowedRole="ROLE_HANDLER">
                         <Handler />
                     </PrivateRoute>
                 }
          />
          <Route path="/access-denied"  element={<AccessDenied />} />
        </Routes>
      </Router>
  );
}

export default App;

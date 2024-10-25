import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './handlers/AuthContext.jsx';
import PrivateRoute from './Components/PrivateRoute';
import CleaningRequest from './Components/CleaningRequest';
import Login from './Components/Login';
import RaiseRequest from './Components/RaiseRequest.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />  {/* Public route */}
          <Route 
            path="/request" 
            element={
              <PrivateRoute>
                <CleaningRequest/>
              </PrivateRoute>
            }
          />
          <Route 
            path="/raiserequest" 
            element={
              <PrivateRoute>
                <RaiseRequest/>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

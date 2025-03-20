import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import useRestoreSession from './hooks/useRestoreSession';
import { RootState } from './redux/store';
import { Spin } from 'antd';

const App = () => {
  const isInitialized = useRestoreSession();

  const { user } = useSelector((state: RootState) => state.auth);

  if (!isInitialized) {
    return (
      <div className="spinner-container">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={ user ? <Navigate to="/dashboard" replace /> : <Login /> } />
        <Route path="/dashboard" element={ user ? <Dashboard /> : <Navigate to="/" replace /> } />
      </Routes>
    </Router>
  );
};

export default App;

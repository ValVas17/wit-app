import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
// import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPasswordPage from './pages/ResetPasswordPage';
// import LessonDetail from './pages/LessonDetail';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className="App">
          <div className="background-blobs">
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>
            <div className="blob blob-4"></div>
          </div>

          <div className="main-content">
            <Header />
            
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/login" element={<Login />} /> */}
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              {/* <Route path="/reset-password/:token" element={<ResetPasswordPage />} /> */}
              {/* <Route path="/lesson/:id" element={<LessonDetail />} /> */}
              
              {/* Запасной маршрут - перенаправление на главную */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
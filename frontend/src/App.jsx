import { Navigate, Route, Routes } from "react-router";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import Transactions from "./pages/Transactions/Transactions";

function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/dashboard' element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path='/transactions' element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
      <Route path='*' element={<NotFoundPage />} />

      <Route path='/' element={<Navigate to='/login' replace />} />
    </Routes>
  );
}

export default App;

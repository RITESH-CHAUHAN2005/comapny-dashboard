import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Departments from './pages/Departments';
import Products from './pages/Products';
import Defects from './pages/Defects';
import Customers from './pages/Customers';
import Suppliers from './pages/Suppliers';
import RawMaterials from './pages/RawMaterials';
import ProductMaterials from './pages/ProductMaterials';
import EmployeeProduct from './pages/EmployeeProduct';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider, useAuth } from './components/AuthContext';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 p-4 overflow-y-auto">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/employees" element={<ProtectedRoute><Employees /></ProtectedRoute>} />
              <Route path="/departments" element={<ProtectedRoute><Departments /></ProtectedRoute>} />
              <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
              <Route path="/defects" element={<ProtectedRoute><Defects /></ProtectedRoute>} />
              <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
              <Route path="/suppliers" element={<ProtectedRoute><Suppliers /></ProtectedRoute>} />
              <Route path="/raw-materials" element={<ProtectedRoute><RawMaterials /></ProtectedRoute>} />
              <Route path="/product-materials" element={<ProtectedRoute><ProductMaterials /></ProtectedRoute>} />
              <Route path="/employee-product" element={<ProtectedRoute><EmployeeProduct /></ProtectedRoute>} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

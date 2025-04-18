// placeholder for client/src/components/Sidebar.jsx
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-full p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Company System</h2>
      <nav className="space-y-2">
        <Link to="/" className="block hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        <Link to="/employees" className="block hover:bg-gray-700 p-2 rounded">Employees</Link>
        <Link to="/departments" className="block hover:bg-gray-700 p-2 rounded">Departments</Link>
        <Link to="/products" className="block hover:bg-gray-700 p-2 rounded">Products</Link>
        <Link to="/defects" className="block hover:bg-gray-700 p-2 rounded">Defects</Link>
        <Link to="/customers" className="block hover:bg-gray-700 p-2 rounded">Customers</Link>
        <Link to="/suppliers" className="block hover:bg-gray-700 p-2 rounded">Suppliers</Link>
        <Link to="/raw-materials" className="block hover:bg-gray-700 p-2 rounded">Raw Materials</Link>
        <Link to="/product-materials" className="block hover:bg-gray-700 p-2 rounded">Product Materials</Link>
        <Link to="/employee-product" className="block hover:bg-gray-700 p-2 rounded">Employee Product</Link>
      </nav>
    </div>
  );
};

export default Sidebar;

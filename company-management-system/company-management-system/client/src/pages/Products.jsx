import { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import { useAuth } from '../components/AuthContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { token } = useAuth();

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('/api/products', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setProducts(res.data);
    } catch (err) {
      setError('Failed to fetch products');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleEdit = (data) => {
    setEditId(data.id);
    setFormData(data);
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError('');
    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      setError('Failed to delete product');
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const method = editId ? 'put' : 'post';
      const url = editId ? `/api/products/${editId}` : '/api/products';
      await axios[method](url, formData, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      });
      setIsOpen(false);
      setFormData({});
      setEditId(null);
      fetchData();
    } catch (err) {
      setError('Failed to save product');
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <button onClick={() => setIsOpen(true)} className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <DataTable data={products} columns={['id', 'name', 'type', 'price', 'mfd', 'department_id']} onEdit={handleEdit} onDelete={handleDelete} />
      )}
      <FormModal
        isOpen={isOpen}
        fields={['name', 'type', 'price', 'mfd', 'department_id']}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default Products;

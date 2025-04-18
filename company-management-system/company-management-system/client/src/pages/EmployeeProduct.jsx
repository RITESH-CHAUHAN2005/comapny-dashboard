// placeholder for client/src/pages/EmployeeProduct.jsx
import { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';

const EmployeeProduct = () => {
  const [records, setRecords] = useState([]);
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
      const res = await axios.get('/api/employee_product', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setRecords(res.data);
    } catch (err) {
      setError('Failed to fetch records');
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
      await axios.delete(`/api/employee_product/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      setError('Failed to delete record');
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const method = editId ? 'put' : 'post';
      const url = editId ? `/api/employee_product/${editId}` : '/api/employee_product';
      await axios[method](url, formData, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      });
      setIsOpen(false);
      setFormData({});
      setEditId(null);
      fetchData();
    } catch (err) {
      setError('Failed to save record');
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Employee Product</h1>
        <button onClick={() => setIsOpen(true)} className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <DataTable data={records} columns={['id', 'employee_id', 'product_id']} onEdit={handleEdit} onDelete={handleDelete} />
      )}
      <FormModal
        isOpen={isOpen}
        fields={['employee_id', 'product_id']}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default EmployeeProduct;

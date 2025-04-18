// placeholder for client/src/pages/Employees.jsx
import { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
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
      const res = await axios.get('/api/employees', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setEmployees(res.data);
    } catch (err) {
      setError('Failed to fetch employees');
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
      await axios.delete(`/api/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      setError('Failed to delete employee');
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const method = editId ? 'put' : 'post';
      const url = editId ? `/api/employees/${editId}` : '/api/employees';
      await axios[method](url, formData, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      });
      setIsOpen(false);
      setFormData({});
      setEditId(null);
      fetchData();
    } catch (err) {
      setError('Failed to save employee');
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Employees</h1>
        <button onClick={() => setIsOpen(true)} className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <DataTable data={employees} columns={['id', 'name', 'address', 'designation', 'contact_no', 'salary', 'department_id']} onEdit={handleEdit} onDelete={handleDelete} />
      )}
      <FormModal
        isOpen={isOpen}
        fields={['name', 'address', 'designation', 'contact_no', 'salary', 'department_id']}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default Employees;

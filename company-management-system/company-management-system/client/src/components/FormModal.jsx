// placeholder for client/src/components/FormModal.jsx
import { useEffect } from 'react';

const FormModal = ({ isOpen, fields, formData, setFormData, onSubmit, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">Form</h2>
        {fields.map(field => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field}
            value={formData[field] || ''}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        ))}
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
          <button onClick={onSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;

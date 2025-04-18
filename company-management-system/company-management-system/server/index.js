const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Route imports
const employeesRoute = require('./routes/employees');
const productsRoute = require('./routes/products');
const departmentsRoute = require('./routes/departments');
const defectsRoute = require('./routes/defects');
const customersRoute = require('./routes/customers');
const suppliersRoute = require('./routes/suppliers');
const rawMaterialsRoute = require('./routes/raw_materials');
const employeeProductRoute = require('./routes/employee_product');
const productMaterialsRoute = require('./routes/product_materials');
const statsRoute = require('./routes/stats');
const authRoute = require('./routes/auth');

// ✅ Route mounting
app.use('/api/employees', employeesRoute);
app.use('/api/products', productsRoute);
app.use('/api/departments', departmentsRoute);
app.use('/api/defects', defectsRoute);
app.use('/api/customers', customersRoute);
app.use('/api/suppliers', suppliersRoute);
app.use('/api/raw-materials', rawMaterialsRoute);
app.use('/api/employee-product', employeeProductRoute);
app.use('/api/product-materials', productMaterialsRoute);
app.use('/api/stats', statsRoute); // If implemented
app.use('/api/auth', authRoute);

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
app.get('/', (req, res) => {
    res.send('🎉 Backend is working fine!');
  });

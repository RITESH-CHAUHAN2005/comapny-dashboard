// placeholder for db.sql
-- Departments Table
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  contact_no VARCHAR(20),
  head VARCHAR(100)
);

-- Employees Table
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  address TEXT,
  designation VARCHAR(100),
  contact_no VARCHAR(20),
  salary NUMERIC,
  department_id INT REFERENCES departments(id) ON DELETE SET NULL
);

-- Products Table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  type VARCHAR(100),
  price NUMERIC,
  mfd DATE,
  department_id INT REFERENCES departments(id) ON DELETE SET NULL
);

-- Defects Table
CREATE TABLE defects (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products(id) ON DELETE CASCADE,
  employee_id INT REFERENCES employees(id) ON DELETE SET NULL,
  description TEXT,
  defect_date DATE,
  status VARCHAR(20)
);

-- Customers Table
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  address TEXT,
  contact_no VARCHAR(20)
);

-- Suppliers Table
CREATE TABLE suppliers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  address TEXT,
  contact_no VARCHAR(20)
);

-- Raw Materials Table
CREATE TABLE raw_materials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  quantity INT,
  price NUMERIC
);

-- Product-Materials Mapping Table (Many-to-Many)
CREATE TABLE product_materials (
  product_id INT REFERENCES products(id) ON DELETE CASCADE,
  material_id INT REFERENCES raw_materials(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, material_id)
);

-- Employee-Product Mapping Table (Many-to-Many)
CREATE TABLE employee_product (
  product_id INT REFERENCES products(id) ON DELETE CASCADE,
  employee_id INT REFERENCES employees(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, employee_id)
);

-- Users Table for authentication
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin'
);

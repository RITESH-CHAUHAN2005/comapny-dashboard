const express = require('express');
const router = express.Router();
const sql = require('../db');

router.get('/', async (req, res) => {
  try {
    const stats = {};
    const employeeCount = await sql`SELECT COUNT(*) FROM employees`;
    stats.total_employees = employeeCount[0].count;
    const productCount = await sql`SELECT COUNT(*) FROM products`;
    stats.total_products = productCount[0].count;
    const defectCount = await sql`SELECT COUNT(*) FROM defects`;
    stats.total_defects = defectCount[0].count;
    const materialCount = await sql`SELECT COUNT(*) FROM raw_materials`;
    stats.total_materials = materialCount[0].count;
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

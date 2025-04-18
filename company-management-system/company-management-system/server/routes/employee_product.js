const express = require('express');
const router = express.Router();
const sql = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await sql`
      SELECT ep.employee_id, ep.product_id, e.name AS employee_name, p.name AS product_name
      FROM employee_product ep
      JOIN employees e ON ep.employee_id = e.id
      JOIN products p ON ep.product_id = p.id
    `;
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { product_id, employee_id } = req.body;
  try {
    const result = await sql`
      INSERT INTO employee_product (product_id, employee_id) VALUES (${product_id}, ${employee_id}) RETURNING *
    `;
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/', async (req, res) => {
  const { product_id, employee_id } = req.body;
  try {
    await sql`
      DELETE FROM employee_product WHERE product_id=${product_id} AND employee_id=${employee_id}
    `;
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

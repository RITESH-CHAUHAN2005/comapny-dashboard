const express = require('express');
const router = express.Router();
const sql = require('../db');

router.get('/', async (req, res) => {
  try {
    const defects = await sql`SELECT * FROM defects`;
    res.json(defects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { product_id, employee_id, description, defect_date, status } = req.body;
  try {
    const result = await sql`
      INSERT INTO defects (product_id, employee_id, description, defect_date, status)
      VALUES (${product_id}, ${employee_id}, ${description}, ${defect_date}, ${status}) RETURNING *
    `;
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { product_id, employee_id, description, defect_date, status } = req.body;
  try {
    await sql`
      UPDATE defects SET product_id=${product_id}, employee_id=${employee_id}, description=${description}, defect_date=${defect_date}, status=${status} WHERE id=${id}
    `;
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await sql`DELETE FROM defects WHERE id=${id}`;
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

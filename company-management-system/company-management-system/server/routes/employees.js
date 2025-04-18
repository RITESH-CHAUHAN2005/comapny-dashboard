const express = require('express');
const router = express.Router();
const sql = require('../db');

router.get('/', async (req, res) => {
  try {
    const employees = await sql`SELECT * FROM employees`;
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, address, designation, contact_no, salary, department_id } = req.body;
  try {
    const result = await sql`
      INSERT INTO employees (name, address, designation, contact_no, salary, department_id)
      VALUES (${name}, ${address}, ${designation}, ${contact_no}, ${salary}, ${department_id})
      RETURNING *
    `;
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, address, designation, contact_no, salary, department_id } = req.body;
  try {
    await sql`
      UPDATE employees SET name=${name}, address=${address}, designation=${designation}, contact_no=${contact_no}, salary=${salary}, department_id=${department_id} WHERE id=${id}
    `;
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await sql`DELETE FROM employees WHERE id=${id}`;
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

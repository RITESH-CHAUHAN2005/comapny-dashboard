const express = require('express');
const router = express.Router();
const sql = require('../db');

router.get('/', async (req, res) => {
  try {
    const departments = await sql`SELECT * FROM departments`;
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, contact_no, head } = req.body;
  try {
    const result = await sql`
      INSERT INTO departments (name, contact_no, head) VALUES (${name}, ${contact_no}, ${head}) RETURNING *
    `;
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, contact_no, head } = req.body;
  try {
    await sql`
      UPDATE departments SET name=${name}, contact_no=${contact_no}, head=${head} WHERE id=${id}
    `;
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await sql`DELETE FROM departments WHERE id=${id}`;
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

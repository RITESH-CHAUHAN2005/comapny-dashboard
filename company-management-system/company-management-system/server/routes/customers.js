const express = require('express');
const router = express.Router();
const sql = require('../db');

router.get('/', async (req, res) => {
  try {
    const customers = await sql`SELECT * FROM customers`;
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, address, contact_no } = req.body;
  try {
    const result = await sql`
      INSERT INTO customers (name, address, contact_no) VALUES (${name}, ${address}, ${contact_no}) RETURNING *
    `;
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, address, contact_no } = req.body;
  try {
    await sql`
      UPDATE customers SET name=${name}, address=${address}, contact_no=${contact_no} WHERE id=${id}
    `;
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await sql`DELETE FROM customers WHERE id=${id}`;
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

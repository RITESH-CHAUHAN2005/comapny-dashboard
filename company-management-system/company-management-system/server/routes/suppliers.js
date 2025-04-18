const express = require('express');
const router = express.Router();
const sql = require('../db');

router.get('/', async (req, res) => {
  try {
    const suppliers = await sql`SELECT * FROM suppliers`;
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, address, contact_no } = req.body;
  try {
    const result = await sql`
      INSERT INTO suppliers (name, address, contact_no) VALUES (${name}, ${address}, ${contact_no}) RETURNING *
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
      UPDATE suppliers SET name=${name}, address=${address}, contact_no=${contact_no} WHERE id=${id}
    `;
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await sql`DELETE FROM suppliers WHERE id=${id}`;
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


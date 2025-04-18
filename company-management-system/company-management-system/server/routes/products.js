const express = require('express');
const router = express.Router();
const sql = require('../db');

router.get('/', async (req, res) => {
  try {
    const products = await sql`SELECT * FROM products`;
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, type, price, mfd, department_id } = req.body;
  try {
    const result = await sql`
      INSERT INTO products (name, type, price, mfd, department_id) VALUES (${name}, ${type}, ${price}, ${mfd}, ${department_id}) RETURNING *
    `;
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, type, price, mfd, department_id } = req.body;
  try {
    await sql`
      UPDATE products SET name=${name}, type=${type}, price=${price}, mfd=${mfd}, department_id=${department_id} WHERE id=${id}
    `;
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await sql`DELETE FROM products WHERE id=${id}`;
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

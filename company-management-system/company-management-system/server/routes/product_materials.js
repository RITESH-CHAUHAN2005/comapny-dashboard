const express = require('express');
const router = express.Router();
const sql = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await sql`
      SELECT pm.product_id, pm.material_id, p.name AS product_name, r.name AS material_name
      FROM product_materials pm
      JOIN products p ON pm.product_id = p.id
      JOIN raw_materials r ON pm.material_id = r.id
    `;
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { product_id, material_id } = req.body;
  try {
    const result = await sql`
      INSERT INTO product_materials (product_id, material_id) VALUES (${product_id}, ${material_id}) RETURNING *
    `;
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/', async (req, res) => {
  const { product_id, material_id } = req.body;
  try {
    await sql`
      DELETE FROM product_materials WHERE product_id=${product_id} AND material_id=${material_id}
    `;
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

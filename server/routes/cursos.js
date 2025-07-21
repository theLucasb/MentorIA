const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, (req, res) => {
  res.json({ msg: 'Acesso permitido a usuários autenticados', user: req.user });
});

module.exports = router;

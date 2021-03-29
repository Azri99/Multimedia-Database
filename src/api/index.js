const express = require('express');

const files = require('./files');
const tables = require('./tables');

const router = express.Router();

router.use('/files', files);
router.use('/tables', tables);

module.exports = router;

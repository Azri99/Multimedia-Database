const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();

const uri = 'http://localhost:5000/api/v1';

router.get('/', async (req, res)=>{
    let resultFiles = await fetch(`${uri}/files`);
    let responFiles = await resultFiles.json();
    let dataFiles = responFiles.rows;
    
    let resultTables = await fetch(`${uri}/tables`);
    let responTables = await resultTables.json();
    let dataTables = responTables.rows;
    
    res.render('index', {dataFiles, dataTables});
});

module.exports = router;
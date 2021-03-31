const btoa = require('btoa');
const oracledb = require('oracledb');
const express = require('express');
const { uploadMem } = require('../services/multer');
const { simpleExecute } = require('../services/database');

const router = express.Router();

router.post('/', uploadMem.single('file'), async (req, res, next) => {
  try {
    let {filetype} = JSON.parse(req.body.data);
    let result = await simpleExecute(`insert into MULCONSEPT(filename, filedata, filetype) values (:filename, :filedata, :filetype)`,
    {
       filename: `${Date.now().toString()}_${req.file.originalname}`,
       filetype: filetype,
       filedata: req.file.buffer
    });
    res.json(result)
    
 } catch (error) {
    console.error(error);
    next(error);
 }
});


router.put('/', uploadMem.single('file') ,async (req, res, next) => {
  try {
     let {filetype, filename} = JSON.parse(req.body.data);
     let filedata = req.file.buffer;
     let result = await simpleExecute(`update MULCONSEPT set filename = :filenamenew,  filetype = :filetype, filedata = :filedata where filename = :filename`, {
        filename,
        filetype,
        filedata,
        filenamenew: `${Date.now().toString()}_${req.file.originalname}`,
     });
     res.json(result)
  } catch (error) {
     console.error(error);
     next(error);
  }
});


router.delete('/:filename', async (req, res, next) => {
  try {
     let filename = req.params.filename;
     let result = await simpleExecute(`delete MULCONSEPT where filename = :filename`, {
        filename,
     });
     res.json(result);
  } catch (error) {
     console.error(error);
     next(error);
  }
});

router.get('/', async (req, res) => {
  const result = await simpleExecute('select * from mulconsept where filedata is not null', [], {
      fetchInfo: {"FILEDATA": {type: oracledb.BUFFER}} 
  });
  result.rows.forEach(e=> e.FILEDATA = e.FILEDATA.toString('base64'));
  res.json(result);
});

router.get('/all', async (req, res) => {
   const result = await simpleExecute('select * from mulconsept', [], {
       fetchInfo: {"FILEDATA": {type: oracledb.BUFFER}} 
   });
   result.rows.forEach(e=> e.FILEDATA = e.FILEDATA?.toString('base64'));
   res.json(result);
 });

module.exports = router;

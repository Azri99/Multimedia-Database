const fs = require('fs');
const express = require('express');
const oracledb=  require('oracledb');
const {uploadLocal} = require('../services/multer');
const {simpleExecute}= require('../services/database');

const router = express.Router();

router.post('/', uploadLocal.single('file') ,async (req, res, next) => {
   try {
      let {filetype} = JSON.parse(req.body.data);
      let result = await simpleExecute(`insert into MULCONSEPT(filename, filetype) values (:filename, :filetype)`, {
         filename: req.file.filename,
         filetype: filetype
      });
      res.json(result)
   } catch (error) {
      next(error);
   }
});


router.put('/', uploadLocal.single('file') ,async (req, res, next) => {
   try {
      let {filetype, filename} = JSON.parse(req.body.data);
      fs.unlinkSync("./src/uploads/" + filename);
      let result = await simpleExecute(`update MULCONSEPT set filename = :filenamenew,  filetype = :filetype where filename = :filename`, {
         filename,
         filetype,
         filenamenew: req.file.filename,
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
      fs.unlinkSync("./src/uploads/" + filename);
      let result = await simpleExecute(`delete MULCONSEPT where filename = :filename`, {
         filename,
      });
      res.json(result);
   } catch (error) {
      console.error(error);
      next(error);
   }
});


router.get('/',async (req, res, next) => {
   try {
      let result = await simpleExecute(`select filename, filetype from mulconsept where filedata is null`);
      res.json(result);
   } catch (error) {
      next(error);
   }
});

module.exports = router;
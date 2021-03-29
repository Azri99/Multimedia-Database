const multer = require('multer');

const storageLocal = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './src/uploads');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now().toString()}_${file.originalname}`);
    
  }
});

const storageMem = multer.memoryStorage();

const uploadLocal = multer({ storage: storageLocal });

const uploadMem = multer({ storage: storageMem });

module.exports = {
  uploadLocal,
  uploadMem
};

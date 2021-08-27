import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import { isLoggedIn } from './middlewares.js';

const router = express.Router();

// try {
//     fs.readFileSync('uploads');
// } catch (error) {
//     console.error('폴더가 없어서 새로 생성합니다.');
//     fs.mkdirSync("uploads");
// }

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
  
router.post('/libimg', isLoggedIn, upload.single('libb'), (req, res) => {
  try {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
  } catch (error) {
    return console.error(error);
  }
});

router.post('/stdimg', isLoggedIn, upload.single('stdb'), (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
});


export default router;
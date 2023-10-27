import express from "express";
// import multer from 'multer';
// import path from 'path';
import Dropbox from "dropbox";
import dotenv from "dotenv";
dotenv.config();
const env = process.env;

import { isLoggedIn, isAdmin } from "./middlewares.mjs";

const router = express.Router();

// try {
//     fs.readFileSync('uploads');
// } catch (error) {
//     console.error('폴더가 없어서 새로 생성합니다.');
//     fs.mkdirSync("uploads");
// }

// const upload = multer({
//   storage: multer.diskStorage({
//     destination(req, file, cb) {
//       cb(null, 'public/uploads/');
//     },
//     filename(req, file, cb) {
//       const ext = path.extname(file.originalname);
//       cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
//     },
//   }),
//   limits: { fileSize: 5 * 1024 * 1024 },
// });

/** 이미지 업로드 */
const upload = async (path, file, res) => {
  try {
    const dbx = new Dropbox({ accessToken: env.DROPBOX_APP_SECRET });
    const name = path + file.name + file.lastModified;
    await dbx.filesUpload({ path: name, contents: file });
    const response = await dbx.sharingCreateSharedLinkWithSettings({
      path: name,
      settings: {
        access: "viewer",
        audience: "public",
        requested_visibility: "public",
      },
    });
    res.send({
      status: "OK",
      code: 200,
      data: {
        url: response.result.url,
      },
    });
  } catch (e) {
    res.send({
      status: "OK",
      code: 200,
      data: {
        url: "",
      },
    });
  }
};

router.post("/libimg", isLoggedIn, isAdmin, (req, res) => {
  try {
    upload("libb", req.body.libb, res);
  } catch (error) {
    return console.error("libImg route 에러" + error);
  }
});

router.post("/stdimg", isLoggedIn, (req, res) => {
  try {
    upload("stdb", req.body.libb, res);
  } catch (error) {
    return console.error("stdImg route 에러" + error);
  }
});

export default router;

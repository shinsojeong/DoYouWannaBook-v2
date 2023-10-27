import express from "express";
import multer from "multer";
// import path from 'path';
import { Dropbox } from "dropbox";
import dotenv from "dotenv";
dotenv.config();
const env = process.env;

import { isLoggedIn, isAdmin } from "./middlewares.mjs";

const router = express.Router();

/** 버퍼값 저장 */
const upload = multer({
  storage: multer.memoryStorage(),
});

/** 이미지 업로드 */
const uploadToDbx = async (req, res) => {
  try {
    const dbx = new Dropbox({
      accessToken: env.DROPBOX_ACCESS_TOKEN,
      clientId: env.DROPBOX_APP_KEY,
      clientSecret: env.DROPBOX_APP_SECRET,
    });
    const { fieldname, originalname, buffer } = req.file;
    const name = Date.now() + originalname; //파일명
    const path = `/${fieldname}/${name}`; //파일 위치

    //파일 업로드
    await dbx.filesUpload({
      path,
      contents: buffer,
    });

    //업로드 파일 정보
    const file = await dbx.sharingCreateSharedLinkWithSettings({
      path,
      settings: {
        access: "viewer",
        audience: "public",
        requested_visibility: "public",
      },
    });
    console.log(file);

    // const uploadFile = await dbx.filesGetThumbnailV2({
    //   resource: {
    //     ".tag": "path",
    //     path,
    //   },
    // });

    res.send({
      status: "OK",
      code: 200,
      data: {
        url: `data:image/jpg;base64, ${file.result.url}`,
      },
    });
  } catch (e) {
    console.error("드롭박스에러", e);
    res.send({
      status: "OK",
      code: 200,
      data: {
        url: "",
      },
    });
  }
};

router.post(
  "/libimg",
  isLoggedIn,
  isAdmin,
  upload.single("libb"),
  (req, res) => {
    uploadToDbx(req, res);
  }
);

router.post("/stdimg", isLoggedIn, upload.single("stdb"), (req, res) => {
  uploadToDbx(req, res);
});

export default router;

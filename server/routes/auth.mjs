import express from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import { isLoggedIn } from "./middlewares.mjs";
import { isNotLoggedIn } from "./middlewares.mjs";
import User from "../models/user.mjs";

const router = express.Router();

//회원가입
router.post("/join", isNotLoggedIn, async (req, res, next) => {
  const { std_num, name, dept, gender, ph_num, email, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { std_num: std_num } });
    if (exUser) {
      return res.json({
        status: "ERR",
        code: 400,
        message: "이미 가입된 회원입니다.",
      });
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      std_num,
      name,
      dept,
      gender,
      ph_num,
      email,
      password: hash,
    });
    return res.json({
      status: "OK",
      code: 200,
      message: "회원 가입이 완료되었습니다.",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

//로그인
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.send({
        status: "ERR",
        code: 400,
        message: "일치하는 회원 정보가 없습니다.",
      });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      if (user.auth === false) {
        return res.json({
          status: "OK",
          code: 200,
          data: {
            name: user.name,
            dept: user.dept,
          },
        });
      } else if (user.auth === true) {
        return res.json({
          status: "OK",
          code: 20911,
          data: {
            name: user.name,
            dept: user.dept,
          },
        });
      }
    });
  })(req, res, next); //미들웨어 내의 미들웨어에 (req, res, next) 붙임
});

//로그아웃
router.get("/logout", isLoggedIn, (req, res) => {
  req.logout((err) => {
    req.session.destroy();
    if (err) {
      res.redirect("/");
    } else {
      res.json({
        status: "OK",
        code: 200,
      });
    }
  });
});

export default router;

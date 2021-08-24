import express from 'express';
import passport from 'passport';
import bcript from 'bcrypt';
import { isLoggedIn } from './middlewares.js';
import { isNotLoggedIn } from './middlewares.js';
import User from '../models/user.js';

const router = express.Router();


//회원가입
router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { std_num, name, dept, gender, ph_num, email, password } = req.body;
    try {
        const exUser = await User.findOne({where: { std_num } });
        if (exUser) {
            return res.status(400).send("이미 존재하는 회원");
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            std_num,
            name,
            dept,
            gender,
            ph_num,
            email,
            password: hash
        });
        return res.status(200).send("회원가입 성공");
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

//로그인
router.post('/login', isLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.status(400).send("존재하지 않는 회원");
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.status(200).send("로그인 성공");
        });
    })(req, res, next);  //미들웨어 내의 미들웨어에 (req, res, next) 붙임
});

//로그아웃
router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.status(200).send("로그아웃 성공");
});


//카카오 로그인
router.get('/kakao', passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
}), (req, res) => {
    res.status(200).send("로그인 성공");
})

export default router;
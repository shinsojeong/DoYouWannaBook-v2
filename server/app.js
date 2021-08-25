import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import session from 'express-session';
import dotenv from 'dotenv';
import passport from 'passport';
import cors from 'cors';

dotenv.config();
import adminRouter from './routes/admin.js';
import authRouter from './routes/auth.js';
import chatRouter from './routes/chat.js';
import libbookRouter from './routes/libbook.js';
import stdbookRouter from './routes/stdbook.js';

import db from './models/index.js';
import passportConfig from './passport/index.js';

const app = express();
passportConfig(); //passport 설정
app.set("port", process.env.PORT || 8001);

//sequelize 연동
db.sequelize.sync({ force : false })  //true:실행 시마다 테이블 재생성
.then(() => {
    console.log("데이터베이스 연결 성공");
})
.catch((err) => {
    console.log(err);
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(passport.initialize());  //req 객체에 passport 설정 심는 middleware
app.use(passport.session());  //req.session 객체이 passport 정보 저장하는 middleware

app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/chat', chatRouter);
app.use('/libbook', libbookRouter);
app.use('/stdbook', stdbookRouter);

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
    res.status(err.status || 500);
})

app.listen(app.get("port"), () => {
    console.log(app.get("port"),'번 포트에서 대기 중');
});
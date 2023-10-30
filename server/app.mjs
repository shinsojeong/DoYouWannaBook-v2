import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { createClient } from "redis";
import connectRedis from "connect-redis";
import session from "express-session";
import dotenv from "dotenv";
import passport from "passport";
import cors from "cors";
//import httpModule from 'http';
//import { Server } from 'socket.io';
import helmet from "helmet";
import hpp from "hpp";
import path from "path";

import adminRouter from "./routes/admin.mjs";
import authRouter from "./routes/auth.mjs";
import chatRouter from "./routes/chat.mjs";
import libbookRouter from "./routes/libbook.mjs";
import stdbookRouter from "./routes/stdbook.mjs";
import mailRouter from "./routes/mail.mjs";
import uploadRouter from "./routes/upload.mjs";

import db from "./models/index.mjs";
import passportConfig from "./passport/index.mjs";

dotenv.config();
const app = express();
passportConfig(); //passport 설정
app.set("port", process.env.PORT ? process.env.PORT : 8001);

//sequelize 연동
db.sequelize
  .sync({ force: false }) //true:실행 시마다 테이블 재생성
  .catch((err) => {
    console.log(err);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "https://web-front-euegqv2llo71vvuq.sel5.cloudtype.app",
    credentials: true,
  })
);

//redis 연동
const redisClient = await createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();
const redisStore = new connectRedis({
  client: redisClient,
  prefix: "dywb:",
});
app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(cookieParser(process.env.COOKIE_SECRET));

if (process.env.NODE_ENV === "production") {
  // sessionOption.proxy = true;  //https일 때
  // sessionOption.cookie.secure = true;  //https일 때
  app.use(morgan("combined"));
  app.use(helmet());
  app.use(hpp({ contentSecurityPolicy: false }));
} else {
  app.use(morgan("dev"));
}
app.use(passport.initialize()); //req 객체에 passport 설정 심는 middleware
app.use(passport.session()); //req.session 객체에 passport 정보 저장하는 middleware

app.use("/admin", adminRouter);
app.use("/auth", authRouter);
app.use("/chat", chatRouter);
app.use("/libbook", libbookRouter);
app.use("/stdbook", stdbookRouter);
app.use("/mail", mailRouter);
app.use("/upload", uploadRouter);

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});

//react build 연동
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(path.resolve(), "build", "index.html"));
  });
}

//socket
// const http = httpModule.createServer(app);
// const io = new Server(http);

// io.on("connection", (socket) => {
//     socket.on("join", (userid) => {  //join 이벤트로 데이터 받음
//         socket.join(userid);  //userid로 방 생성
//     });

//     socket.on("send", (touserid) => {  //send 이벤트로 데이터 받음
//         io.to(touserid).emit("user", touserid);
//     });

//     socket.on("disconnetcion", () => {

//     })
// });

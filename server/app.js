const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const session = require("express-session");
const { sequelize } = require("./models");

const app = express();

app.set("port", process.env.PORT || 8001);

//sequelize 연동
sequelize.sync({ force : false })  //true:실행 시마다 테이블 재생성
.then(() => {
    console.log("데이터베이스 연결 성공");
})
.catch((err) => {
    console.log(err);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
    res.status(err.status || 500);
    res.render("error");
})

app.listen(app.get("port"), () => {
    console.log(app.get("port"),'번 포트에서 대기 중');
});
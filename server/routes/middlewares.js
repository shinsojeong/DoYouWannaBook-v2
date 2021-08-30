const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.send({
            status: "ERR",
            code: 403,
            message: "로그인을 해주세요."
        });
    }
};

const isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.send({
            status: "ERR",
            code: 405,
            message: "이미 로그인 상태입니다."
        });
    }
};

export { isLoggedIn, isNotLoggedIn };
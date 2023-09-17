import User from '../models/user.mjs';

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

const isAdmin = async(req, res, next) => {
    try {
        const auth = await User.findOne({
            attributes: ['auth'],
            where: {
                std_num: req.user.std_num
            }
        });
        if (auth.auth===false) {
            return res.send({
                status: "ERR",
                code: 406,
                message: "권한 없음"
            });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.send(error);
    }
}

export { isLoggedIn, isNotLoggedIn, isAdmin };
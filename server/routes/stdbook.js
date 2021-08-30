import express from 'express';
import sequelize from 'sequelize';
import Stdbook from '../models/stdbook.js';
import { isLoggedIn } from './middlewares.js';

const router = express.Router();


//학생 도서 검색
router.get('/search_std_book', isLoggedIn, async(req, res) => {
    const { keyword } = req.query;
    try {
        const exBook = await Stdbook.findAll({
            order: [['stdb_code', 'DESC']],
            attributes: ['stdb_code', 'stdb_title', 'stdb_author', 'stdb_publisher', 'stdb_pub_date', 'stdb_rental_fee', 'stdb_rental_date', 'stdb_img', 'stdb_comment', 'lender'],
            where: {
                stdb_state: true,
                [sequelize.Op.or]: [
                    {
                        stdb_title: {
                            [sequelize.Op.like]: "%"+keyword+"%"
                        }
                    }, {
                        stdb_author: {
                            [sequelize.Op.like]: "%"+keyword+"%"
                        }
                    }
                ]
            }
        });
        if (!exBook) {
            return res.send({
                status: "ERR",
                code: 400,
                message: "검색 결과 없음"
            });
        }
        return res.send({
            status: "OK",
            code: 200,
            data: exBook
        });
    } catch (error) {
        console.error(error);
        return res.send(error);
    }
});

//학생 도서 등록
router.post('/create_std_book', isLoggedIn, async(req, res) => {
    const { std_num, stdb_title, stdb_author, stdb_publisher, stdb_pub_date, stdb_rental_date, stdb_rental_fee, stdb_state, stdb_comment, stdb } = req.body;
    console.log(req.body)
    try {
        await Stdbook.create({
            stdb_title, 
            stdb_author, 
            stdb_publisher, 
            stdb_pub_date, 
            stdb_rental_date, 
            stdb_rental_fee, 
            stdb_state, 
            stdb_comment,
            lender: std_num,
            stdb_img: stdb
        });
        return res.send({
            status: "OK",
            code: 200
        });
    } catch (error) {
        console.error(error);
        return res.send(error);
    }
});

//학생 도서 삭제
router.get('/delete_std_book', isLoggedIn, async(req, res) => {
    const { stdb_code } = req.query;
    try {
        await Stdbook.destroy({
            where: { stdb_code }
        });
        return res.send({
            status: "OK",
            code: 200
        });
    } catch (error) {
        console.error(error);
        return res.send(error);
    }
});

//내 도서 목록 조회
router.get('/get_my_book_list', isLoggedIn, async(req, res) => {
    const { std_num } = req.query;
    try {
        const exBook = await Stdbook.findAll({ where: { lender : std_num } });
        if (!exBook) {
            return res.send({
                status: "ERR",
                code: 400,
                message: "조회 결과가 없습니다."
            });
        }
        return res.send({
            status: "OK",
            code: 200,
            data: exBook
        });
    } catch (error) {
        console.error(error);
        return res.send(error);
    }
});

//학생 도서 대출 조회
router.get('/mypage_std_borrow_list', isLoggedIn, async(req, res) => {
    const { std_num } = req.query;
    try {
        const exBook = await Stdbook.findAll({
            attributes: ['stdb_title', 'stdb', 'lender', 'stdb_ret_date'],
            where: { 
                borrower : std_num 
            }
        });
        if (!exBook) {
            return res.send({
                status: "ERR",
                code: 400,
                message: "조회 결과 없음"
            });
        }
        return res.json(exBook);
    } catch (error) {
        console.error(error);
        return res.send(error);
    }
});

//내 도서 목록 조회
router.get('/get_chat_book', isLoggedIn, async(req, res) => {
    const { stdb_code } = req.query;
    try {
        const exBook = await Stdbook.findOne({ where: { stdb_code } });
        if (!exBook) {
            return res.send({
                status: "ERR",
                code: 400,
                message: "조회 결과가 없습니다."
            });
        }
        return res.send({
            status: "OK",
            code: 200,
            data: exBook
        });
    } catch (error) {
        console.error(error);
        return res.send(error);
    }
});

export default router;
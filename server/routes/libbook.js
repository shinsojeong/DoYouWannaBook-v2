import express from 'express';
import sequelize from 'sequelize';
import Libbook from '../models/libbook.js';
import Libclass from '../models/libclass.js';
import { isLoggedIn } from './middlewares.js';

const router = express.Router();


//도서 검색
router.get('/search_book', isLoggedIn, async(req, res) => {
    const { keyword } = req.query;
    try {
        const exBook = await Libbook.findAll({
            attributes: ['libb_code', 'libb_title', 'libb_author', 'libb_publisher', 'libb_pub_date', 'libb_img', 'libb_class', 'libb_isbn', 'libb_state'],
            where: {
                [sequelize.Op.or]: [
                    {
                        libb_title: {
                            [sequelize.Op.like]: "%"+keyword+"%"
                        }
                    }, {
                        libb_author: {
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

//도서 상세 검색
router.get('/search_book_detail', isLoggedIn, async(req, res) => {
    const { libb_code } = req.query;
    try {
        const exBook = await Libbook.findOne({
            attributes: ['libb_code', 'libb_title', 'libb_author', 'libb_publisher', 'libb_pub_date', 'libb_img', 'libb_class', 'libb_isbn', 'libb_state'],
            where: {
                libb_code
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

//신작 조회
router.get('/get_recommended_book', isLoggedIn, async(req, res) => {
    try {
        const recBook = await Libbook.findAll({ 
            attributes: ['libb_code','libb_title',"libb_img","libb_author"],
            order: [['libb_pub_date', 'DESC']],
            limit: 5
        });
        if (!recBook) {
            return res.send({
                status: "ERR",
                code: 400,
                message: "신작이 없습니다."
            });
        }
        return res.send({
            status: "OK",
            code: 200,
            data: recBook
        });
    } catch (error) {
        console.error(error);
        return res.send(error);
    }
});

//도서 위치 정보 조회
router.get('/get_book_location', isLoggedIn, async(req, res) => {
    const { libb_class } = req.query;
    try {
        const location = await Libclass.findOne({ where: { class_sign: libb_class } });
        return res.send({
            status: "OK",
            code: 200,
            data: location
        });
    } catch (error) {
        console.error(error);
        return res.send(error);
    }
});

//도서 대출
router.post('/borrow', isLoggedIn, async(req, res) => {
    const { libb_barcode, borrower } = req.body;
    const today = new Date();
    try {
        const exBorrower = await Libbook.findOne({ 
            attributes: ['borrower'],
            where: { libb_barcode: libb_barcode }
        });
        if (exBorrower.borrower!==null) {
            return res.send({
                status: "ERR",
                code: 400,
                message: "이미 대출중인 도서"
            });
        }
        await Libbook.update({
            borrower: borrower,
            libb_ret_date: today.setDate(today.getDate() + 7)
        }, { 
            where: { libb_barcode: libb_barcode } 
        });
        return res.send({
            status: "OK",
            code: 200,
            message: "대출 성공"
        });
    } catch (error) {
        console.error(error);
        return res.send(error);
    }
});

//대출 내역 조회
router.get('/mypage_borrow_list', isLoggedIn, async(req, res) => {
    const { std_num } = req.query;
    try {
        const exList = await Libbook.findAll({ where: { borrower: std_num } });
        if (exList.length===0) {
            return res.send({
                status: "ERR",
                code: 400,
                message: "대출중인 도서가 없습니다."
            });
        }
        return res.send({
            status: "OK",
            code: 200,
            data: exList
        });
    } catch (error) {
        console.error(error);
        return res.send(error);
    }
});

//대출 연장
router.post('/mypage_borrow_extend', isLoggedIn, async(req, res) => {
    const { std_num, libb_code, libb_ret_date } = req.body;
    const date = new Date(libb_ret_date);
    try {
        await Libbook.update({
            libb_ret_date: date.setDate(date.getDate() + 7)
        }, {
            where: { libb_code, borrower: std_num }
        })
        return res.send({
            status: "OK",
            code: 200,
            message: "대출 연장 성공"
        });
    } catch (error) {
        console.error(error);
        return res.send(error);
    }
});

export default router;
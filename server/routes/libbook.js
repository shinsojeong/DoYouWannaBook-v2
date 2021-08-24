import express from 'express';
import Libbook from '../models/libbook.js';
import { isLoggedIn } from './middlewares.js';

const router = express.Router();


//도서 검색
router.get('/search_book', isLoggedIn, async(req, res) => {
    const { keyword } = req.body;
    try {
        const exBook = await Libbook.findAll({
            attributes: ['libb_code', 'libb_title', 'libb_author', 'libb_publisher', 'libb_pub_date', 'libb', 'libb_class', 'libb_isgn', 'libb_state'],
            where: {
                book_name: keyword  //나중에 수정할 것 (ex 공백 제외)
            }
        })
        if (!exBook) {
            return res.status(400).send("검색 결과 없음");
        }
        return res.json(exBook);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});

//신작 조회
router.get('/get_recommended_book', isLoggedIn, async(req, res) => {
    try {
        const recBook = await Libbook.findOne({ 
            where: {
                limit: 5 
            }
        });
        if (!recBook) {
            return res.status(400).send("신작 없음");
        }
        return res.json(recBook);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});

//도서 위치 정보 조회
router.get('/get_book_location', isLoggedIn, async(req, res) => {
    const { libb_class } = req.body;
    try {
        const location = await Libbook.findOne({ where: { libb_class } });
        return res.json(location);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});

//도서 대출
router.post('/borrow', isLoggedIn, async(req, res) => {
    const { libb_barcode, std_num } = req.body;
    try {
        const exBorrower = await Libbook.findOne({ where: { libb_barcode } });
        if (exBorrower) {
            return res.status(400).send("이미 대출중인 도서");
        }
        await Libbook.update({
            borrower: std_num
        }, { 
            where: { libb_barcode } 
        });
        return res.status(200).send("대출 성공");
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});

//대출 내역 조회
router.get('/mypage_borrow_list', isLoggedIn, async(req, res) => {
    const { std_num } = req.body;
    try {
        const exList = await Libbook.findAll({ where: { borrower: std_num } });
        if (!exList) {
            return res.status(400).send("대출중인 도서가 없습니다.");
        }
        return res.json(exList);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});

//대출 연장
router.get('/mypage_borrow_extend', isLoggedIn, async(req, res) => {
    const { std_num, libb_code } = req.body;
    try {
        const book = await Libbook.findOne({ 
            attributes: ['libb_ret_date'],
            where: { libb_code } 
        });
        await Libbook.update({
            libb_ret_date: book.libb_ret_date+7  //7일로 저장되는지 확인 필요
        }, {
            where: { libb_code, borrower: std_num }
        })
        return res.status(200).send("대출 연장 성공");
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});

export default router;
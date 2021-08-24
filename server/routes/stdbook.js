import express from 'express';
import Stdbook from '../models/stdbook.js';
import { isLoggedIn } from './middlewares.js';

const router = express.Router();


//학생 도서 검색
router.get('/search_std_book', isLoggedIn, async(req, res) => {
    const { keyword } = req.body;
    try {
        const exBook = await Stdbook.findAll({
            attributes: ['stdb_code', 'stdb_title', 'stdb_author', 'stdb_publisher', 'stdb_rental_fee', 'stdb_rental_date', 'stdb_state', 'stdb', 'stdb_comment', 'lender'],
            where: { 
                book_name: keyword  //나중에 수정할 것 (ex 공백 제외)
            }
        });
        if (!exBook) {
            return res.status(400).send("검색 결과 없음");
        }
        return res.json(exBook);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});

//학생 도서 등록
router.post('/create_std_book', isLoggedIn, async(req, res) => {
    const { book_name, author, publisher, publish_date, rent_date, fee, state, info, book_img } = req.body;
    try {
        await Stdbook.create({
            book_name,
            author,
            publisher, 
            publish_date, 
            rent_date, 
            fee, 
            state, 
            info, 
            book_img
        });
        return res.status(200).send("도서 등록 성공");
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});

//학생 도서 삭제
router.get('/delete_std_book', isLoggedIn, async(req, res) => {
    const { stdb_code } = req.body;
    try {
        await Stdbook.destroy({
            where: { stdb_code }
        });
        return res.status(200).send("도서 삭제 성공");
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});

//내 도서 목록 조회
router.get('/get_my_book_list', isLoggedIn, async(req, res) => {
    const { std_num } = req.body;
    try {
        const exBook = await Stdbook.findAll({
            attributes: ['stdb_code', 'stdb_title', 'stdb_state', 'stdb', 'borrower', 'stdb_ret_date'],
            where: {
                lender : std_num 
            }
        });
        if (!exBook) {
            return res.status(400).send("조회 결과 없음");
        }
        return res.json(exBook);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});

//학생 도서 대출 조회
router.get('/mypage_std_borrow_list', isLoggedIn, async(req, res) => {
    const { std_num } = req.body;
    try {
        const exBook = await Stdbook.findAll({
            attributes: ['stdb_title', 'stdb', 'lender', 'stdb_ret_date'],
            where: { 
                borrower : std_num 
            }
        });
        if (!exBook) {
            return res.status(400).send("조회 결과 없음");
        }
        return res.json(exBook);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});

export default router;
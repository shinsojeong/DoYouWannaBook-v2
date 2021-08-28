import express from 'express';
import Libbook from '../models/libbook.js';
import Libclass from '../models/libclass.js';
import { isLoggedIn } from './middlewares.js';

const router = express.Router();

//도서 조회
router.get('/admin_search_book', isLoggedIn, async(req, res) => {
    const { keyword } = req.query;
    try {
        const exBook = await Libbook.findAll({
            attributes: ['libb_code', 'libb_title', 'libb_author', 'libb_publisher', 'libb_pub_date', 'libb_img', 'libb_state'],
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

//도서 정보 조회
router.get('/admin_get_info', isLoggedIn, async(req, res) => {
    const { libb_code } = req.query;
    try {
        const book = await Libbook.findOne({ where: { libb_code } });
        const location = await Libclass.findOne({ where: { class_sign: book.libb_class } });
        return res.send({
            status: "OK",
            code: 200,
            data: {
                selected_book: {
                    book: book,
                    location: location
                }
            }
        });
    } catch (error) {
        console.error(error);
        return res.send(error);
    }
});

//도서 등록
router.post('/admin_create_book', isLoggedIn, async(req, res, next) => {
    const { libb_code, libb_title, libb_author, libb_publisher, libb_pub_date, libb_state, libb_isbn, libb_barcode, libb_class, room, bookshelf, shelf, libb_img } = req.body;
    
    try {
        const exClass = await Libclass.findOne({where: { class_sign: libb_class } });
        if(!exClass) {
            await Libclass.create({
                class_sign: libb_class,
                room,
                bookshelf,
                shelf
            });
        }
        await Libbook.create({
            libb_code, 
            libb_title, 
            libb_author, 
            libb_publisher, 
            libb_pub_date, 
            libb_state, 
            libb_isbn, 
            libb_barcode, 
            libb_class,
            libb_img
        });
        return res.send({
            status: "OK",
            code: 200,
            message: "도서 등록 완료"
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

//도서 수정
router.post('/admin_update_book', isLoggedIn, async(req, res, next) => {
    const { pre_code, libb_code, libb_title, libb_author, libb_publisher, libb_pub_date, libb_state, libb_isbn, libb_barcode, libb_class, libb_img, room, bookshelf, shelf } = req.body;
    try {
        const exClass = await Libclass.findOne({where: { class_sign: libb_class } });
        if(!exClass) {  //분류기호 존재하지 않으면 새로 생성
            await Libclass.create({
                class_sign: libb_class,
                room,
                bookshelf,
                shelf
            });
        } else {  //분류기호 존재하면 새로운 데이터로 수정
            await Libclass.update({
                room, bookshelf, shelf
            }, { where: { class_sign: libb_class } });
        }
        await Libbook.update({
            libb_code, 
            libb_title, 
            libb_author,
            libb_publisher, 
            libb_pub_date, 
            libb_state, 
            libb_isbn, 
            libb_barcode, 
            libb_class,
            libb_img
        }, { where: { libb_code: pre_code } });
        return res.send({
            status: "OK",
            code: 200,
            message: "도서 수정 완료"
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

//도서 삭제
router.get('/admin_delete_book', isLoggedIn, async(req, res) => {
    const { libb_code } = req.query;
    try {
        await Libbook.destroy({
            where: { libb_code }
        });
        return res.send({
            status: "OK",
            code: 200
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

export default router;
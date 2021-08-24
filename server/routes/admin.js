import express from 'express';
import Libbook from '../models/libbook.js';
import Libclass from '../models/libclass.js';
import { isLoggedIn } from './middlewares.js';

const router = express.Router();


//도서 등록
router.post('/admin_create_book', isLoggedIn, (req, res) => {
    const { libb_code, libb_title, libb_author, libb_publisher, libb_pub_date, libb_state, libb_isbn, libb_barcode, libb_class, room, bookshelf, shelf, libb } = req.body;
    try {
        async() => {
            await Libclass.create({
                libb_class,
                room,
                bookshelf,
                shelf
            }).then(async() => {
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
                    libb
                });
                return res.status(200);
            });
        }
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

//도서 수정
router.post('/admin_update_book', isLoggedIn, async(req, res) => {
    const { libb_code, libb_title, libb_author, libb_publisher, libb_date, libb_state, libb_isbn, libb_barcode, libb_class, room, bookshelf, shelf, libb } = req.body;
    try {
        await Libbook.update({
            libb_code, libb_title, libb_author, libb_publisher, libb_date, libb_state, libb_isbn, libb_barcode, libb_class, room, bookshelf, shelf, libb
        }, {
            where: { libb_code }
        });
        return res.status(200).send("도서 정보 수정 완료");
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

//도서 삭제
router.get('/admin_delete_book', isLoggedIn, async(req, res) => {
    const { libb_code } = req.body;
    try {
        await Libbook.destroy({
            where: { libb_code }
        });
        return res.status(200);
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

export default router;
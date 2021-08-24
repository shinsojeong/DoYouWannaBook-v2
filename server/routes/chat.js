import express from 'express';
import Chat from '../models/chat.js';
import { isLoggedIn } from './middlewares.js';

const router = express.Router();


//채팅방 생성
router.post('/create_chat', isLoggedIn, async(req, res) => {
    const { part1, part2 } = req.body;
    try {
        const chat = await Chat.create({
            part1,
            part2,
        });
        return res.status(200).json(chat);  //chatCode return
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});

//채팅 리스트 조회
router.get('/get_chat_list', isLoggedIn, async(req, res) => {
    const { std_num } = req.body;
    try {
        const list = await Chat.findAll({ where: { std_num } });
        if (!list) {
            return res.status(400).send("진행중인 채팅이 없습니다.");
        }
        return res.json(list);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});

//채팅 내용 조회
router.get('/get_chat_detail', isLoggedIn, async(req, res) => {
    const { std_num, chat_code } = req.body;
    try {
        const chat = await Chat.findAll({
            where: {
                chat_code,
                [Op.or]: [{ part1: std_num }, { part2: std_num } ]
            }
        });
        if (!chat) {
            return res.status(400).send("채팅 시작 전입니다.");
        }
        return res.json(chat);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});

//채팅 전송
router.post('/send_chat', isLoggedIn, async(req, res) => {
    const { std_num, chat_code, message } = req.body;
    try {
        await Chat.create({
            msg: message,
            chat: chat_code,
            sender: std_num
        });
        return res.status(200);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});

export default router;
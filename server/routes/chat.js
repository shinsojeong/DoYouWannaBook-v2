import express from 'express';
import sequelize from 'sequelize';
import Chat from '../models/chat.js';
import Message from '../models/message.js';
import { isLoggedIn } from './middlewares.js';

const router = express.Router();


//채팅방 생성
router.post('/create_chat', isLoggedIn, async(req, res) => {
    const { stdb_code, part1, part2 } = req.body;
    if(part1==part2) {
        return res.send({
            status: "ERR",
            code: 400,
            message: "사용자님이 등록하신 도서입니다."
        })
    }
    try {
        const exChat = await Chat.findOne({ 
            attributes: ['chat_code'],
            where: { stdb_code, part1, part2 } 
        });
        if(exChat) {
            return res.send({
                status: "ERR",
                code: 400,
                message: "채팅방이 이미 존재합니다.",
                data: exChat
            })
        }
        const chat = await Chat.create({
            stdb_code,
            part1,
            part2,
        });
        console.log(chat);
        return res.send({
            status: "OK",
            code: 200,
            data: chat
        });  //chatCode return
    } catch (error) {
        console.error(error);
        return res.send(error);
    }
});

//채팅 리스트 조회
router.get('/get_chat_list', isLoggedIn, async(req, res) => {
    const { std_num } = req.query;
    try {
        const list = await Chat.findAll({ 
            where: { 
                [sequelize.Op.or]: [{ part1: std_num }, { part2: std_num } ]
            },
            include: [{ 
                model: Message,
                attributes : ['chat','msg'],
                separate: false,
                limit: 1
            }],
            order: [ 
                [ {model: Message}, 'created_at', 'DESC' ] 
            ]
        });
        if (!list) {
            return res.send({
                status: "ERR",
                code: 400,
                message: "진행중인 채팅이 없습니다."
            });
        }
        return res.send({
            status: "OK",
            code: 200,
            data: list
        });
    } catch (error) {
        console.error(error);
        return res.send(error);
    }
});

//채팅 내용 조회1 (stdb_code, std_num)
router.post('/get_chat_detail1', isLoggedIn, async(req, res) => {
    const { stdb_code, std_num } = req.body;
    try {
        const chat = await Chat.findOne({
            attributes: ['chat_code', 'part1', 'part2'],
            where: {
                stdb_code,
                [sequelize.Op.or]: [{ part1: std_num }, { part2: std_num } ]
            }
        });
        if (!chat) {
            return res.send({
                status: "ERR",
                code: 400,
                message: "채팅방이 존재하지 않습니다."
            });
        }
        const messages = await Message.findAll({ where: { chat: chat.chat_code } });
        return res.send({
            status: "OK",
            code: 200,
            data: {
                chat_code: chat.chat_code,
                participant: {
                    part1: chat.part1,
                    part2: chat.part2
                },
                messages: messages
            }
        });
    } catch (error) {
        console.error(error);
        return res.send(error);
    }
});

//채팅 내용 조회2 (chat_code, std_num)
router.post('/get_chat_detail2', isLoggedIn, async(req, res) => {
    const { chat_code, std_num } = req.body;
    try {
        const participant = await Chat.findOne({
            attributes: ['part1', 'part2'],
            where: {
                chat_code,
                [sequelize.Op.or]: [{ part1: std_num }, { part2: std_num } ]
            }
        });

        const messages = await Message.findAll({ 
            where: { 
                chat: chat_code
            }
        });

        if(!messages) {
            return res.send({
                status: "ERR",
                code: 400,
                message: "메세지를 전송하여 대화를 시작해보세요."
            });
        }
        return res.send({
            status: "OK",
            code: 200,
            data: {
                chat_code: chat_code,
                participant: participant,
                messages: messages
            }
        });
    } catch (error) {
        console.error(error);
        return res.send(error);
    }
});

//채팅 전송
router.post('/send_chat', isLoggedIn, async(req, res) => {
    const { std_num, chat_code, msg } = req.body;
    console.log("채팅코드"+chat_code)
    try {
        await Message.create({
            msg,
            chat: chat_code,
            sender: std_num
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

export default router;
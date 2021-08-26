import express from 'express';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import senderInfo from '../config/mail.js';
import { isNotLoggedIn } from './middlewares.js';
import User from '../models/user.js';

//메일 객체
const mailSender = {
    //전송 함수
    sendGmail: (param) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',   // 메일 보내는 곳
            prot: 587,
            host: 'smtp.gmlail.com',  
            secure: false,
            requireTLS: true ,
            auth: {
                user: senderInfo.user,
                pass: senderInfo.password
            }
        });

        const mailOptions = {
            from: senderInfo.user,
            to: param.toEmail, //수신자
            subject: param.subject, //제목
            text: param.text //내용
        };
            
        //전송    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
};


//라우터
const router = express.Router();
router.post('/findpw', isNotLoggedIn, async(req, res) => {
    const { std_num, name, ph_num, email }  = req.body;

    const temporary = Math.random().toString(36).slice(2);
    const hash = await bcrypt.hash(temporary, 12);

    try {
        //일치하는 정보 있는지 조회
        const exUser = await User.findOne({
            where: { 
                std_num: std_num,
                name: name,
                ph_num: ph_num,
                email: email
            } 
        });

        if (!exUser) {
            return res.json({
                status: "ERR",
                code: 400,
                message: "일치하는 회원 정보가 없습니다."
            });
        }

        //임시 비밀번호로 수정
        await User.update({
            password: hash
        }, {
            where: { 
                std_num: std_num,
                name: name,
                ph_num: ph_num,
                email: email
            }
        });

        const emailParam = {
            toEmail: email,  //수신자
            subject: '[DYWB] 임시 비밀번호 발급',  //제목
            text: "DoYouWannaBook 임시 비밀번호는 "+temporary+" 입니다."  //내용
        };
    
        mailSender.sendGmail(emailParam);
    
        return res.json({
            status: "OK",
            code: 200
        });
    } catch (error) {
        console.error(error);
        return res.send(error);
    }
})
  
export default router;
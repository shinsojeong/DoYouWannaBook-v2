import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendChat } from '../../modules/chat';
import { registerLental } from '../../modules/userBook';

import '../../styles/chat.scss';

const Chat = () => {
    const dispatch = useDispatch();

    const std_num = useSelector(state => state.user.user.std_num);
    const book = useSelector(state => state.userBook.chat_book);
    const chat = useSelector(state => state.chat.selected_chat);
    const chat_code = chat.chat_code;
    const messages = chat.msg;

    const [message, setMessage] = useState("");
    const [retDate, setRetDate] = useState("");

    //대여 정보 등록하기
    const register = () => {
        if(chat.part1==std_num) {
            dispatch(registerLental(book.stdb_code, retDate, chat.part2));
        } else {
            dispatch(registerLental(book.stdb_code, retDate, chat.part1));
        }
    };

    //메세지 전송
    const sendMessage = () => {
        dispatch(sendChat(chat_code, std_num, message));
        setMessage("");
    };

    return (
        <div id="chat" className="contents">
            <div id="book_info">
                <img src={book.stdb_img} alt="bookimg" width="30px"/>
                <p>{book.stdb_title}</p>
            </div>

            <div id="chat_messages">
                {messages.length!==0 ?
                messages.map((item) => {
                    return (
                        item.sender===std_num ? 
                        <div id="me">
                            <p>{item.msg}</p>
                            {/* <p>{item.created_at.slice(0,10)+" "+item.created_at.slice(11,19)}</p>     */}
                        </div>
                        : <div id="you">
                            <p>{item.msg}</p>
                            <p>{item.created_at.slice(0,10)+" "+item.created_at.slice(11,19)}</p>  
                        </div>
                    )
                })
                : <p id="message">메세지를 전송하여 채팅을 시작해보세요.</p>}
            </div>

            <div id="rent_info">
                {book.lender===std_num ?
                !book.borrower ?
                    <div id="register">
                        <label>반납 예정일</label>
                        <input type="date" value={retDate||''} onChange={(e) => setRetDate(e.target.value)} />
                        <input type="button" value="등록" onClick={register}/>
                    </div>
                    : 
                    <div id="info">
                        <p>반납 예정일 : {book.stdb_ret_date.slice(0,10)}</p>
                    </div>
                :!book.borrower ?
                <div id="register">
                    <p>상대방이 반납 예정일을 등록하지 않았습니다.</p>
                </div>
                : 
                <div id="info">
                    <p>반납 예정일 : {book.stdb_ret_date.slice(0,10)}</p>
                </div>
                }
                )
            </div>

            <div id="send">
                <input type="text" value={message||""} onChange={(e) => setMessage(e.target.value)}/>
                <input type="button" value="전송" onClick={sendMessage}/>
            </div>
        </div>
    );
};

export default Chat;
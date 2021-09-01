import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getChatBook } from '../../modules/userBook';
import { getChatList, getChatDetail2 } from '../../modules/chat';
import { CgProfile } from "react-icons/cg";

const ChatList = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const std_num = useSelector(state => state.user.user.std_num);
    const chat_list = useSelector(state => state.chat.chat_list);

    useEffect(() => {
        dispatch(getChatList(std_num));
    }, [dispatch, std_num])

    //채팅방 입장
    const enterChat = (chat_code, stdb_code) => {
        dispatch(getChatBook(stdb_code));
        dispatch(getChatDetail2(chat_code, std_num, history));
    };

    return (
        <div id="chat_list">
            {chat_list.length!==0 ? 
            chat_list.map((item) => {
               return (
                   <div key={item.chat_code} className="list_item" onClick={() => enterChat(item.chat_code, item.stdb_code)}>
                       <table>
                           <tbody>
                                <tr>
                                    <td rowSpan="2"><CgProfile size="70"/></td>
                                    {item.borrower!==std_num ? <td>{item.part1}</td> : <td>{item.part2}</td>}
                                </tr>
                                <tr>
                                    <td>{item.Messages.length!==0 ? item.Messages[0].msg : "채팅 시작 전입니다."}</td>
                                </tr>
                           </tbody>
                       </table>
                   </div>
               ) 
            }) : <p id="message">진행중인 채팅이 없습니다.</p>}
        </div>
    );
};

export default ChatList;
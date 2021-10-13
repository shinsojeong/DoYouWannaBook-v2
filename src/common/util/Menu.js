import React from 'react';
import { useHistory } from 'react-router-dom';
import { debounce } from 'lodash';

import { AiOutlineHome, AiOutlineBarcode, AiOutlineShareAlt, AiOutlineMessage, AiOutlineUser } from 'react-icons/ai';
import '../../styles/menu.scss';

const TopBar = () => {
    const history = useHistory();

    //function
    const go = debounce((url) => {
        history.push(`${url}`);
    }, 800);

    return (
        <footer className="foot_menu">
            <table>
                <tbody>
                    <tr id="menu_items">
                        <td><AiOutlineBarcode className="icon" size="50" onClick={() => go("/user/barcode")}/></td>
                        <td><AiOutlineShareAlt className="icon" size="50" onClick={() => go("/user/std-main")}/></td>
                        <td><AiOutlineHome className="icon" size="50" onClick={() => go("/user/home")}/></td>
                        <td><AiOutlineMessage className="icon" size="50" onClick={() => go("/user/chat-list")}/></td>
                        <td><AiOutlineUser className="icon" size="50" onClick={() => go("/user/mypage")}/></td>
                    </tr>
                    <tr id="title">
                        <td>바코드 대출</td>
                        <td>공유 도서</td>
                        <td>홈</td>
                        <td>채팅</td>
                        <td>마이페이지</td>
                    </tr>
                    </tbody>
            </table>
        </footer>
    );
};

export default TopBar;
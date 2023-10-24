import React from "react";

import useMove from "../../hook/useMove";

import {
  AiOutlineHome,
  AiOutlineBarcode,
  AiOutlineShareAlt,
  AiOutlineMessage,
  AiOutlineUser,
} from "react-icons/ai";
import "../../styles/menu.scss";

export default function Menu() {
  const navigate = useMove();
  return (
    <footer className="foot_menu">
      <table>
        <tbody>
          <tr
            id="menu_items"
            onClick={(e) => navigate(e.target.getAttribute("name"))}
          >
            <td>
              <AiOutlineBarcode
                className="icon"
                size="50"
                name="/user/barcode"
              />
            </td>
            <td>
              <AiOutlineShareAlt
                className="icon"
                size="50"
                name="/user/std-main"
              />
            </td>
            <td>
              <AiOutlineHome className="icon" size="50" name="/user/home" />
            </td>
            <td>
              <AiOutlineMessage
                className="icon"
                size="50"
                name="/user/chat-list"
              />
            </td>
            <td>
              <AiOutlineUser className="icon" size="50" name="/user/mypage" />
            </td>
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
}

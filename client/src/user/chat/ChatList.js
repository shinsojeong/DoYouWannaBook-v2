import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import useDebounce from "../../hook/useDebounce";
import useMove from "../../hook/useMove";

import { getChatBook } from "../../modules/userBook";
import { getChatList, getChatDetail2 } from "../../modules/chat";

import ChangeHeader from "../../common/util/ChangeHeader";

import { CgProfile } from "react-icons/cg";

export default function ChatList() {
  const [dispatch, navigate, debounce] = [
    useDispatch(),
    useMove(),
    useDebounce(),
  ];

  const std_num = parseInt(useSelector((state) => state.user.user.std_num));
  const chat_list = useSelector((state) => state.chat.chat_list);

  useEffect(() => {
    dispatch(getChatList(std_num));
    ChangeHeader({
      title: "userChatList",
      dispatch,
    });
  }, [dispatch, std_num]);

  /** 채팅방 입장 */
  const enterChat = debounce((chat_code, stdb_code) => {
    dispatch(getChatBook(stdb_code));
    dispatch(getChatDetail2(chat_code, std_num, navigate));
  });

  return (
    <div id="chat_list" className="contents">
      {chat_list.length > 0 &&
        chat_list.map(
          ({ chat_code, stdb_code, borrower, part1, part2, Messages }) => {
            return (
              <div
                key={chat_code}
                className="flex-row"
                id="list_item"
                onClick={() => enterChat(chat_code, stdb_code)}
              >
                <CgProfile size="70" />
                <div className="flex-col" id="info">
                  <span id="std_num">{std_num === part1 ? part2 : part1}</span>
                  <div>
                    {Messages.length > 0
                      ? Messages[0].msg
                      : "채팅 시작 전입니다."}
                  </div>
                </div>
              </div>
            );
          }
        )}
      {chat_list.length === 0 && <p id="message">진행중인 채팅이 없습니다.</p>}
    </div>
  );
}

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";

import useDebounce from "../../hook/useDebounce";
import useMove from "../../hook/useMove";

import { sendChat } from "../../modules/chat";
import { registerLental } from "../../modules/userBook";
import { changeBar } from "../../modules/topBar";

import "../../styles/chat.scss";

export default function Chat() {
  const socket = useMemo(
    () =>
      io("https://port-0-doyouwannabook-euegqv2llo71vvuq.sel5.cloudtype.app", {
        transports: ["websocket"],
        withCredentials: true,
      }),
    []
  );

  const [dispatch, navigate, debounce] = [
    useDispatch(),
    useMove(),
    useDebounce(),
  ];

  const scrollRef = useRef(); //스크롤을 위한 ref

  const std_num = parseInt(useSelector((state) => state.user.user.std_num));
  const { stdb_code, stdb_img, stdb_title, lender, borrower, stdb_ret_date } =
    useSelector((state) => state.userBook.chat_book);
  const { chat_code, msg, part1, part2 } = useSelector(
    (state) => state.chat.selected_chat
  );

  const [message, setMessage] = useState("");
  const [retDate, setRetDate] = useState("");

  useEffect(() => {
    dispatch(
      changeBar({
        left: "back",
        center: { title: `${part1 === std_num ? part2 : part1}`, data: null },
        right: "null",
        lfunc: () => navigate(-1),
        rfunc: null,
        size: "small",
      })
    );
    scrollToBottom();
  }, []);

  /** 소켓 초기화 */
  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        socket.emit("enter", { chat_code, std_num });
      });
      socket.on("send", ({ sender, msg }) => {
        dispatch(sendChat(chat_code, sender, msg));
      });
    }

    return () => {
      socket.off("send");
      socket.disconnect();
    };
  }, [socket]);

  /** 대여 정보 등록하기 */
  const register = debounce(() => {
    if (part1 === std_num) {
      dispatch(registerLental(stdb_code, retDate, part2));
    } else {
      dispatch(registerLental(stdb_code, retDate, part1));
    }
  });

  /** 메세지 전송 */
  const sendMessage = debounce(async () => {
    socket.emit("send", { chat_code, sender: std_num, msg: message });
    dispatch(sendChat(chat_code, std_num, message));
    setMessage("");
  });

  /** 스크롤 */
  const scrollToBottom = useCallback(() => {
    scrollRef?.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [scrollRef]);

  useEffect(() => {
    scrollToBottom();
  }, [scrollRef, msg]);

  return (
    <div id="chat" className="contents">
      <div id="book_info">
        <img
          src={stdb_img}
          alt="bookimg"
          width="80px"
          height="80px"
          onError={(e) => (e.target.src = "http://placehold.it/120x160")}
        />
        <p>{stdb_title}</p>
      </div>

      <div id="chat_messages" ref={scrollRef}>
        {msg.length > 0 &&
          msg.map(({ sender, msg, created_at }) => {
            return sender === std_num ? (
              <div id="me" key={created_at}>
                <p id="message">{msg}</p>
                <p id="time">{created_at.toString().slice(0, 10)}</p>
              </div>
            ) : (
              <div id="you" key={created_at}>
                <p id="message">{msg}</p>
                <p id="time">{created_at.toString().slice(0, 10)}</p>
              </div>
            );
          })}
        {msg.length === 0 && (
          <p id="message">메세지를 전송하여 채팅을 시작해보세요.</p>
        )}
      </div>

      <div id="rent_info">
        {/** 현재 사용자가 책을 빌려주는 학생일 경우 */}
        {lender === std_num && !borrower && (
          <div id="register">
            <label>반납 예정일</label>
            <input
              type="date"
              value={retDate || ""}
              onChange={(e) => setRetDate(e.target.value)}
            />
            <input type="button" value="등록" onClick={register} />
          </div>
        )}
        {lender === std_num && borrower && (
          <div id="info">
            <p>반납 예정일 : {stdb_ret_date.slice(0, 10)}</p>
          </div>
        )}

        {/** 현재 사용자가 책을 빌리는 학생일 경우 */}
        {lender !== std_num && !borrower && (
          <div id="register">
            <p>상대방이 반납 예정일을 등록하지 않았습니다.</p>
          </div>
        )}
        {lender !== std_num && borrower && (
          <div id="info">
            <p>반납 예정일 : {stdb_ret_date.slice(0, 10)}</p>
          </div>
        )}
      </div>

      <div id="send">
        <input
          type="text"
          value={message || ""}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
}

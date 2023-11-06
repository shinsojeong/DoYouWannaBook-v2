import axios from "axios";
const url = process.env.REACT_APP_SERVER;

//initial state
const INIT_CHAT_STATE = {
  chat_list: [], // {chat_code, last_message, std_num}
  selected_chat: {
    chat_code: 0,
    msg: "", // {sender, send_date, msg}
  },
};

//action type
const CREATECHAT = "CREATECHAT";
const GETCHATLIST = "GETCHATLIST";
const SENDCHAT = "SENDCHAT";
const GETCHATDETAIL = "GETCHATDETAIL";
const RESETCHAT = "RESETCHAT";

/** 채팅방 생성 */
export const createChat = (stdb_code, part1, part2) => async (dispatch) => {
  try {
    const {
      data: { status, data, message },
    } = await axios.post(
      `${url}/chat/create_chat`,
      {
        stdb_code,
        part1,
        part2,
      },
      {
        withCredentials: true,
      }
    );

    if (status === "OK") {
      dispatch({
        type: CREATECHAT,
        payload: data,
      });
    } else {
      return alert(message);
    }
  } catch (err) {
    return console.error(err);
  }
};

/** 채팅방 리스트 가져오기 */
export const getChatList = (std_num) => async (dispatch) => {
  try {
    const {
      data: { status, data },
    } = await axios.get(`${url}/chat/get_chat_list?std_num=${std_num}`, {
      withCredentials: true,
    });

    if (status === "OK") {
      dispatch({
        type: GETCHATLIST,
        payload: data,
      });
    }
  } catch (err) {
    return console.error(err);
  }
};

/** 채팅 전송 */
export const sendChat = (chat_code, std_num, msg) => async (dispatch) => {
  try {
    dispatch({
      type: SENDCHAT,
      payload: {
        chat_code,
        msg,
        std_num,
        created_at: new Date(),
      },
    });
  } catch (err) {
    return console.error(err);
  }
};

/** 채팅 내용 가져오기1 (stdb_code, std_num) */
export const getChatDetail1 =
  (stdb_code, std_num, navigate) => async (dispatch) => {
    try {
      const {
        data: { status, data, message },
      } = await axios.post(
        `${url}/chat/get_chat_detail1`,
        {
          stdb_code,
          std_num,
        },
        {
          withCredentials: true,
        }
      );

      if (status === "OK") {
        dispatch({
          type: GETCHATDETAIL,
          payload: data,
        });
        return navigate("/user1/chat"); //채팅방 내로 이동
      } else {
        return alert(message);
      }
    } catch (err) {
      return console.error(err);
    }
  };

/** 채팅 내용 가져오기2 (chat_code, std_num) */
export const getChatDetail2 =
  (chat_code, std_num, navigate) => async (dispatch) => {
    try {
      const {
        data: { status, data, message },
      } = await axios.post(
        `${url}/chat/get_chat_detail2`,
        {
          chat_code,
          std_num,
        },
        {
          withCredentials: true,
        }
      );

      if (status === "OK") {
        dispatch({
          type: GETCHATDETAIL,
          payload: data,
        });
        return navigate("/user1/chat"); //채팅방 내로 이동
      } else {
        return alert(message);
      }
    } catch (err) {
      return console.error(err);
    }
  };

/** 리덕스 리셋 */
export const resetChat = () => (dispatch) => {
  dispatch({
    type: RESETCHAT,
  });
};

/** reducer */
const chat = (state = INIT_CHAT_STATE, action) => {
  switch (action.type) {
    case CREATECHAT:
      return state;
    case GETCHATLIST:
      return {
        ...state,
        chat_list: action.payload,
      };
    case SENDCHAT:
      return {
        ...state,
        selected_chat: {
          ...state.selected_chat,
          msg: [
            ...state.selected_chat.msg,
            {
              msg: action.payload.msg,
              created_at: action.payload.created_at,
              chat: action.payload.chat_code,
              sender: action.payload.std_num,
            },
          ],
        },
      };
    case GETCHATDETAIL:
      return {
        ...state,
        selected_chat: {
          chat_code: action.payload.chat_code,
          part1: action.payload.participant.part1,
          part2: action.payload.participant.part2,
          msg: action.payload.messages,
        },
      };
    case RESETCHAT:
      return INIT_CHAT_STATE;
    default:
      return state;
  }
};

export default chat;

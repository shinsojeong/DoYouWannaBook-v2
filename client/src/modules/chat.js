import axios from 'axios';
const url = process.env.REACT_APP_SERVER;

//initial state
const INIT_CHAT_STATE = {
    chat_list: [],  // {chat_code, last_message, std_id}
    selected_chat: {
        chat_code: 0,
        messages: []  // {sender, send_date, message}
    }
};


//action type
const CREATECHAT = "CREATECHAT";
const GETCHATLIST = "GETCHATLIST";
const SENDCHAT = "SENDCHAT";
const GETCHATDETAIL = "GETCHATDETAIL";

//채팅방 생성
export const createChat = (
    std_id1, std_id2
    ) => async(dispatch) => {
    await axios.post(`${url}/create_chat`, {std_id1, std_id2} , {
        headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
    }).then((res) => {
        if(res.data.status==="OK") {
            dispatch({
                type: CREATECHAT,
                payload: res.data.data
            });
            history.push(`${url}/chat?${res.data.data}`);
        }
    }).catch((err) => {
        alert(err.response.data.message);
    });
};

//채팅방 리스트 가져오기
export const getChatList = (
    std_id
    ) => async(dispatch) => {
    await axios.get(`${url}/get_chat_list?std_id=${std_id}`, {} , {
        headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
    }).then((res) => {
        if(res.data.status==="OK") {
            dispatch({
                type: GETCHATLIST,
                payload: res.data.data
            });
        }
    }).catch((err) => {
        alert(err.response.data.message);
    });
};

//채팅 보내기
export const sendChat = (
    std_id, send_time, message
    ) => async(dispatch) => {
    await axios.post(`${url}/send_chat`, {std_id, send_time, message} , {
        headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
    }).then((res) => {
        if(res.data.status==="OK") {
            dispatch({
                type: SENDCHAT,
                payload: message
            });
        }
    }).catch((err) => {
        alert(err.response.data.message);
    });
};

//채팅 내용 가져오기
export const getChatDetail = (
    std_id, chat_code
    ) => async(dispatch) => {
    await axios.get(`${url}/send_chat`, {std_id, chat_code} , {
        headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
    }).then((res) => {
        if(res.data.status==="OK") {
            dispatch({
                type: GETCHATDETAIL,
                payload: res.data.data
            });
        }
    }).catch((err) => {
        alert(err.response.data.message);
    });
};



//reducer
const chat = (state = INIT_CHAT_STATE, action) => {
    switch(action.type) {

        case CREATECHAT:
            return state;
        case GETCHATLIST:
            return { 
                ...state, 
                chat_list: action.payload
            };
        case SENDCHAT:
            return {
                ...state,
                selected_chat: {
                    ...chat_code,
                    ...messages.concat(action.payload)
                }
            }
        case GETCHATDETAIL:
            return {
                ...state,
                selected_chat: {
                    chat_code: action.payload.chat_code,
                    messages: action.payload.messages
                }
            }
        default:
            return state;
    };
};

export default chat;
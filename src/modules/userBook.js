import axios from 'axios';
const url = process.env.REACT_APP_SERVER;

//initial state
const INIT_USERBOOK_STATE = {
    search_list: [],  //stdb_code, stdb_title, stdb_author, stdb_publisher, stdb_rental_fee, stdb_rental_date, stdb_state, stdb, stdb_comment, std_num
    my_book_list: [],
    borrow_book_list: [],  //stdb_title, stdb, std_num, stdb_ret_date
    chat_book: []
};


//action type
const SEARCHSTDBOOK = "SEARCHSTDBOOK";
const UPLOADIMG = "UPLOADIMG";
const CREATESTDBOOK = "CREATESTDBOOK";
const DELETESTDBOOK = "DELETESTDBOOK";
const GETMYBOOKLIST = "GETMYBOOKLIST";
const GETBORROWSTDBOOKLIST = "GETBORROWSTDBOOKLIST";
const GETCHATBOOK = "GETCHATBOOK";
const REGISTERLENTAL = "REGISTERLENTAL";
const RESETUSERBOOK = "RESETUSERBOOK";


//학생 대여 검색
export const searchStdBook = (
    keyword
) => async(dispatch) => {
    try {
        const {
            data: {
                status,
                data
            }
        } = await axios.get(`${url}/stdbook/search_std_book?keyword=${keyword}`, { withCredentials: true });
    
        if (status === "OK") {
            dispatch({
                type: SEARCHSTDBOOK,
                payload: data
            });
        }
    } catch (err) {
        return console.error(err);
    }
}

//학생 대여 도서 이미지 등록
export const uploadImg = (
    formData
) => async() => {
    try {
        const {
            data: {
                status,
                message,
                data
            }
        } = await axios.post(`${url}/upload/stdimg`, formData, { withCredentials: "true" });
        if (status === "OK") {
            return data.url;
        } else {
            return alert(message);
        }
    } catch(err) {
        return console.error(err);
    }
}

//학생 대여 도서 등록
export const createStdBook = (
    std_num, 
    stdb_title, 
    stdb_author, 
    stdb_publisher, 
    stdb_pub_date, 
    stdb_rental_date, 
    stdb_rental_fee, 
    stdb_state, 
    stdb_comment, 
    stdb, 
    history
) => async() => {
    try {
        const {
            data: {
                status
            }
        } = await axios.post(`${url}/stdbook/create_std_book`, {
            std_num, 
            stdb_title, 
            stdb_author,
            stdb_publisher,
            stdb_pub_date,
            stdb_rental_date,
            stdb_rental_fee,
            stdb_state,
            stdb_comment,
            stdb
        }, { 
            withCredentials: true 
        });
        
        if (status === "OK") {
            alert("도서 등록 완료");
            return history.push("/user/std-main");
        }
    } catch (err) {
        return console.error(err);
    }
}

//학생 대여 도서 삭제
export const deleteStdBook = (
    stdb_code, 
    history
) => async(dispatch) => {
    try {
        const {
            data: {
                status,
                message
            }
        } = await axios.get(`${url}/stdbook/delete_std_book?stdb_code=${stdb_code}`, { withCredentials: true });
    
        if (status === "OK") {
            dispatch({
                type: DELETESTDBOOK
            });
            return alert("삭제가 완료되었습니다.");
        } else {
            alert(message);
            return history.push("/user/std-main");
        }
    } catch (err)  {
        return console.error(err)
    }
}

//내 도서 조회
export const getMyBookList = (
    std_num
) => async(dispatch) => {
    try {
        const {
            data: {
                status,
                message,
                data
            }
        } = await axios.get(`${url}/stdbook/get_my_book_list?std_num=${std_num}`,{ withCredentials: true });
    
        if (status === "OK") {
            dispatch({
                type: GETMYBOOKLIST,
                payload: data
            });
        } else {
            return alert(message);
        }
    } catch (err) {
        return console.error(err);
    }
}

//학생 도서 대여 목록
export const getBorrowStdBookList = (
    std_num
) => async(dispatch) => {
    try {
        const {
            data: {
                status,
                data
            }
        } = await axios.get(`${url}/stdbook/mypage_std_borrow_list?std_num=${std_num}`, { withCredentials: true });
    
        if (status === "OK") {
            dispatch({
                type: GETBORROWSTDBOOKLIST,
                payload: data
            });
        } else {
            dispatch({
                type: GETBORROWSTDBOOKLIST,
                payload: []
            })
        }
    } catch (err) {
        return console.error(err);
    }
}

//채팅 - 도서 정보
export const getChatBook = (
    stdb_code
) => async(dispatch) => {
    try {
        const {
            data: {
                status,
                data
            }
        } = await axios.get(`${url}/stdbook/get_chat_book?stdb_code=${stdb_code}`, { withCredentials: true });
    
        if (status === "OK") {
            dispatch({
                type: GETCHATBOOK,
                payload: data
            });
        } else {
            dispatch({
                type: GETCHATBOOK,
                payload: []
            });
        }
    } catch (err) {
        return console.error(err);
    }
}

//채팅 - 대여 정보 등록
export const registerLental = (
    stdb_code, 
    stdb_ret_date, 
    borrower
) => async(dispatch) => {
    try {
        const {
            data: {
                status
            }
        } = await axios.post(`${url}/stdbook/register_lental`, {
            stdb_code, 
            stdb_ret_date, 
            borrower
        }, { 
            withCredentials: true 
        })
        
        if (status === "OK") {
            dispatch({
                type: REGISTERLENTAL,
                payload: {
                    stdb_ret_date,
                    borrower
                }
            });
            return alert("대여 정보 등록 성공");
        }
    } catch (err) {
        return console.error(err);
    }
}

//리덕스 리셋
export const resetUserbook = () => (dispatch) => {
    dispatch({
        type: RESETUSERBOOK
    });
};


//reducer
const userBook = (state = INIT_USERBOOK_STATE, { type, payload }) => {
    switch(type) {

        case SEARCHSTDBOOK:
            return {
                ...state,
                search_list: payload
            }
        case UPLOADIMG:
            return state;
        case CREATESTDBOOK:
            return state;
        case DELETESTDBOOK:
            return {
                ...state,
                my_book_list: []
            }
        case GETMYBOOKLIST:
            return {
                ...state,
                my_book_list: payload
            }
        case GETBORROWSTDBOOKLIST:
            return {
                ...state,
                borrow_book_list: payload
            }
        case GETCHATBOOK:
            return {
                ...state,
                chat_book: payload
            }
        case REGISTERLENTAL:
            return {
                ...state,
                chat_book: {
                    ...state.chat_book,
                    stdb_state: false,
                    stdb_ret_date: payload.stdb_ret_date,
                    borrower: payload.borrower
                }
            }
        case RESETUSERBOOK:
            return INIT_USERBOOK_STATE;
        
        default:
            return state;
    }
}

export default userBook;
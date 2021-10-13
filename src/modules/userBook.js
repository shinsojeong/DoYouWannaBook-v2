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


//학생 대여 검색
export const searchStdBook = (
    keyword
) => async(dispatch) => {
    try {
        const res = await axios.get(`${url}/stdbook/search_std_book?keyword=${keyword}`, { withCredentials: true });
    
        if (res.data.status === "OK") {
            dispatch({
                type: SEARCHSTDBOOK,
                payload: res.data.data
            });
        }
    } catch (err) {
        return console.error(err);
    };
};

//학생 대여 도서 이미지 등록
export const uploadImg = (
    formData
) => async() => {
    try {
        const res = await axios.post(`${url}/upload/stdimg`, formData, { withCredentials: "true" });
        if (res.data.status === "OK") {
            return res.data.data.url;
        } else {
            return alert(res.data.message);
        }
    } catch(err) {
        return console.error(err);
    };
};

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
        const res = await axios.post(`${url}/stdbook/create_std_book`, {
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
        
        if (res.data.status === "OK") {
            alert("도서 등록 완료");
            return history.push("/user/std-main");
        }
    } catch (err) {
        return console.error(err);
    };
};

//학생 대여 도서 삭제
export const deleteStdBook = (
    stdb_code, 
    history
) => async(dispatch) => {
    try {
        const res = await axios.get(`${url}/stdbook/delete_std_book?stdb_code=${stdb_code}`, { withCredentials: true });
    
        if (res.data.status === "OK") {
            dispatch({
                type: DELETESTDBOOK
            });
            return alert("삭제가 완료되었습니다.");
        } else {
            alert(res.data.message);
            return history.push("/user/std-main");
        }
    } catch (err)  {
        return console.error(err)
    };
};

//내 도서 조회
export const getMyBookList = (
    std_num
) => async(dispatch) => {
    try {
        const res = await axios.get(`${url}/stdbook/get_my_book_list?std_num=${std_num}`,{ withCredentials: true });
    
        if (res.data.status === "OK") {
            dispatch({
                type: GETMYBOOKLIST,
                payload: res.data.data
            });
        } else {
            return alert(res.data.message);
        }
    } catch (err) {
        return console.error(err);
    };
};

//학생 도서 대여 목록
export const getBorrowStdBookList = (
    std_num
) => async(dispatch) => {
    try {
        const res = await axios.get(`${url}/stdbook/mypage_std_borrow_list?std_num=${std_num}`, { withCredentials: true });
    
        if (res.data.status === "OK") {
            dispatch({
                type: GETBORROWSTDBOOKLIST,
                payload: res.data.data
            });
        } else {
            dispatch({
                type: GETBORROWSTDBOOKLIST,
                payload: []
            })
        }
    } catch (err) {
        return console.error(err);
    };
};

//채팅 - 도서 정보
export const getChatBook = (
    stdb_code
) => async(dispatch) => {
    try {
        const res = await axios.get(`${url}/stdbook/get_chat_book?stdb_code=${stdb_code}`, { withCredentials: true });
    
        if (res.data.status === "OK") {
            dispatch({
                type: GETCHATBOOK,
                payload: res.data.data
            });
        } else {
            dispatch({
                type: GETCHATBOOK,
                payload: []
            });
        }
    } catch (err) {
        return console.error(err);
    };
};

//채팅 - 대여 정보 등록
export const registerLental = (
    stdb_code, 
    stdb_ret_date, 
    borrower
) => async(dispatch) => {
    try {
        const res = await axios.post(`${url}/stdbook/register_lental`, {
            stdb_code, 
            stdb_ret_date, 
            borrower
        }, { 
            withCredentials: true 
        })
        
        if (res.data.status === "OK") {
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
    };
};


//reducer
const userBook = (state = INIT_USERBOOK_STATE, action) => {
    switch(action.type) {

        case SEARCHSTDBOOK:
            return {
                ...state,
                search_list: action.payload
            };
        case UPLOADIMG:
            return {
                ...state
            };
        case CREATESTDBOOK:
            return { 
                ...state
            };
        case DELETESTDBOOK:
            return {
                ...state,
                my_book_list: []
            };
        case GETMYBOOKLIST:
            return {
                ...state,
                my_book_list: action.payload
            };
        case GETBORROWSTDBOOKLIST:
            return {
                ...state,
                borrow_book_list: action.payload
            };
        case GETCHATBOOK:
            return {
                ...state,
                chat_book: action.payload
            };
        case REGISTERLENTAL:
            return {
                ...state,
                chat_book: {
                    stdb_code: state.chat_book.stdb_code,
                    stdb_title: state.chat_book.stdb_title,
                    stdb_author: state.chat_book.stdb_author,
                    stdb_publisher: state.chat_book.stdb_publisher,
                    stdb_pub_date: state.chat_book.stdb_pub_date,
                    stdb_rental_date: state.chat_book.stdb_rental_date,
                    stdb_rental_fee: state.chat_book.stdb_rental_fee,
                    stdb_state: false,
                    stdb_comment: state.chat_book.stdb_comment,
                    stdb_ret_date: action.payload.stdb_ret_date,
                    stdb_img: state.chat_book.stdb_img,
                    lender: state.chat_book.lender,
                    borrower: action.payload.borrower
                }
            };
        
        default:
            return state;
    };
};

export default userBook;
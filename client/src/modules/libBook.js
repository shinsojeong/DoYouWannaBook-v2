import axios from 'axios';
const url = process.env.REACT_APP_SERVER;

//initial state
const INIT_LIBBOOK_STATE = {
    search_result: [],  //book_id, book_name, author, publisher, publish_date, book_img, class_sign, state
    selected_book: {
        book_id: "",
        book_name: "",
        author: "",
        publisher: "",
        publish_date: "",
        book_img: "",
        class_sign: "",
        state: 0
    },
    book_location: {
        room: 0,
        bookshelf: 0,
        shelf: 0
    },
    borrow_list: []  //book_name, book_img, return_date
};


//action type
const SEARCHBOOK = "SEARCHBOOK";
const GETBOOKLOC = "GETBOOKLOC";
const BORROW = "BORROW";
const GETMYPAGEBORROWLIST = "GETMYPAGEBORROWLIST";
const EXTENDDATE = "EXTENDDATE";

//도서관 도서 검색
export const searchBook = (
    keyword
    ) => async(dispatch) => {
    await axios.get(`${url}/search_book?keyword=${keyword}`, {
        headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
    }).then((res) => {
        if(res.data.status==="OK") {
            dispatch({
                type: SEARCHBOOK,
                payload: res.data.data
            });
        }
    }).catch((err) => alert(err.response.data.message));
};

//도서 위치 가져오기
export const getBookLoc = (
    class_sign
    ) => async(dispatch) => {
    await axios.get(`${url}/get_book_location?class_sign=${class_sign}`, {
        headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
    }).then((res) => {
        if(res.data.status==="OK") {
            dispatch({
                type: GETBOOKLOC,
                payload: res.data.data
            });
        }
    }).catch((err) => alert(err.response.data.message));
};

//도서 대출
export const borrow = (
    barcode, std_id
    ) => async(dispatch) => {
    await axios.post(`${url}/borrow`, {barcode, std_id}, {
        headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
    }).then((res) => {
        if(res.data.status==="OK") {
            dispatch({
                type: BORROW
            });
        }
    }).catch((err) => alert(err.response.data.message));
};

//대출 내역 조회
export const getMypageBorrowList = (
    std_id
    ) => async(dispatch) => {
    await axios.get(`${url}/borrow`, {
        std_id: std_id
    }, {
        headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
    }).then((res) => {
        if(res.data.status==="OK") {
            dispatch({
                type: GETMYPAGEBORROWLIST,
                payload: res.data.data
            });
        }
    }).catch((err) => alert(err.response.data.message));
};

//대출 연장
export const extendDate = (
    std_id, book_id
    ) => async(dispatch) => {
    await axios.post(`${url}/mypage_borrow_extend`, {
        std_id: std_id,
        book_id: book_id
    }, {
        headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
    }).then((res) => {
        if(res.data.status==="OK") {
            dispatch({
                type: EXTENDDATE
            });
            alert(res.data.message);
        }
    }).catch((err) => alert(err.response.data.message));
};


//reducer
const libBook = (state = INIT_LIBBOOK_STATE, action) => {
    switch(action.type) {

        case SEARCHBOOK:
            return { 
                ...state, 
                search_result: action.payload
            };
        case GETBOOKLOC:
            return {
                ...state,
                book_location: action.payload
            }
        case BORROW:
            return state;
        case GETMYPAGEBORROWLIST:
            return {
                ...state,
                borrow_list: action.payload
            };
        case EXTENDDATE:
            return state;
        
        default:
            return state;
    };
};

export default libBook;
import axios from 'axios';

const url = process.env.REACT_APP_SERVER;

//initial state
const INIT_LIBBOOK_STATE = {
    recommended_book: [],  //book_name, libb_auth, libb
    search_result: [],  //libb_code, libb_title, libb_auth, libb_publisher, libb_pub_date, libb, libb_class, libb_isbn, libb_state
    selected_book: {
        libb_code: "",
        libb_title: "",
        libb_auth: "",
        libb_publisher: "",
        libb_pub_date: "",
        libb: "",
        libb_class: "",
        libb_isbn: 0,
        libb_state: 0
    },
    book_location: {
        room: 0,
        bookshelf: 0,
        shelf: 0
    },
    borrow_list: []  //libb_code, book_name, libb, return_date
};


//action type
const SEARCHBOOK = "SEARCHBOOK";
const SELECTBOOK = "SELECTBOOK";
const GETRECOMMENDEDBOOK = "GETRECOMMENDEDBOOK";
const GETBOOKLOC = "GETBOOKLOC";
const BORROW = "BORROW";
const GETMYPAGEBORROWLIST = "GETMYPAGEBORROWLIST";
const EXTENDDATE = "EXTENDDATE";


//도서관 도서 검색
export const searchBook = (
    keyword
    ) => async(dispatch) => {
    await axios.get(`${url}/libbook/search_book?keyword=${keyword}`,
    { withCredentials: true })
    .then((res) => {
        if(res.data.status==="OK") {
            dispatch({
                type: SEARCHBOOK,
                payload: res.data.data
            });
        }
    }).catch((err) => console.error(err));
};

//도서 상세보기 선택
export const selectBook = (
    libb_code
) => async(dispatch) => {
    await axios.get(`${url}/libbook/search_book_detail?libb_code=${libb_code}`,
    { withCredentials: true })
    .then((res) => {
        if(res.data.status==="OK") {
            dispatch({
                type: SELECTBOOK,
                payload: res.data.data
            });
        } else {
            alert(res.data.message);
        }
    }).catch((err) => console.error(err));
};

//추천 도서
export const getRecommendedBook = () => async(dispatch) => {
    await axios.get(`${url}/libbook/get_recommended_book`,
    { withCredentials: true })
    .then((res) => {
        if(res.data.status==="OK") {
            dispatch({
                type: GETRECOMMENDEDBOOK,
                payload: res.data.data
            });
        }
    }).catch((err) => console.error(err));
};

//도서 위치 가져오기
export const getBookLoc = (
    libb_class
    ) => async(dispatch) => {
    await axios.get(`${url}/libbook/get_book_location?libb_class=${libb_class}`,
    { withCredentials: true })
    .then((res) => {
        if(res.data.status==="OK") {
            dispatch({
                type: GETBOOKLOC,
                payload: res.data.data
            });
        }
    }).catch((err) => console.error(err));
};

//도서 대출
export const borrow = (
    barcode, std_num
    ) => async(dispatch) => {
    await axios.post(`${url}/borrow`, {barcode, std_num},
    { withCredentials: true })
    .then((res) => {
        if(res.data.status==="OK") {
            dispatch({
                type: BORROW
            });
        }
    }).catch((err) => console.error(err));
};

//대출 내역 조회
export const getMypageBorrowList = (
    std_num
    ) => async(dispatch) => {
    await axios.get(`${url}/borrow`, {
        std_num: std_num
    },{ withCredentials: true })
    .then((res) => {
        if(res.data.status==="OK") {
            dispatch({
                type: GETMYPAGEBORROWLIST,
                payload: res.data.data
            });
        }
    }).catch((err) => console.error(err));
};

//대출 연장
export const extendDate = (
    std_num, libb_code
    ) => async(dispatch) => {
    await axios.post(`${url}/mypage_borrow_extend`, {
        std_num: std_num,
        libb_code: libb_code
    },{ withCredentials: true })
    .then((res) => {
        if(res.data.status==="OK") {
            dispatch({
                type: EXTENDDATE
            });
            alert(res.data.message);
        }
    }).catch((err) => console.error(err));
};


//reducer
const libBook = (state = INIT_LIBBOOK_STATE, action) => {
    switch(action.type) {

        case SEARCHBOOK:
            return { 
                ...state, 
                search_result: action.payload
            };
        case SELECTBOOK:
            return {
                ...state,
                selected_book: action.payload
            };
        case GETRECOMMENDEDBOOK:
            return {
                ...state,
                recommended_book: action.payload
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
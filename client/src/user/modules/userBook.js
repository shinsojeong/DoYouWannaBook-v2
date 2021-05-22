import axios from 'axios';
const url = process.env.REACT_APP_SERVER;

//initial state
const INIT_USERBOOK_STATE = {
    book_list: [],  //std_book_id, book_name, state, book_img, std_id, return_date
    borrow_book_list: []  //book_name, book_img, std_id, return_date
};


//action type
const CREATESTDBOOK = "CREATESTDBOOK";
const DELETESTDBOOK = "DELETESTDBOOK";
const GETMYBOOKLIST = "GETMYBOOKLIST";
const GETBORROWSTDBOOKLIST = "GETBORROWSTDBOOKLIST"

//학생 대여 도서 등록
export const createStdBook = (
    formData  //book_name, author, publisher, publish_date, rent_date, fee, state, info, book_img
    ) => async(dispatch) => {
    await axios.post(`${url}/create_std_book`, formData, {
        headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
    }).then((res) => {
        if(res.data.status==="OK") {
            dispatch({
                type: CREATESTDBOOK
            });
            alert(res.data.message);
        }
    }).catch((err) => alert(err.response.data.message));
};

//학생 대여 도서 삭제
export const deleteStdBook = (
    std_book_id
    ) => async(dispatch) => {
    await axios.post(`${url}/delete_std_book`, {
        std_book_id: std_book_id
    }, {
        headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
    }).then((res) => {
        if(res.data.status==="OK") {
            dispatch({
                type: DELETESTDBOOK
            });
            alert(res.data.message);
        }
    }).catch((err) => alert(err.response.data.message));
};

//내 도서 조회
export const getMyBookList = (
    std_id
    ) => async(dispatch) => {
    await axios.get(`${url}/get_my_book_list`, {
        std_id: std_id
    }, {
        headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
    }).then((res) => {
        if(res.data.status==="OK") {
            dispatch({
                type: GETMYBOOKLIST,
                payload: res.data.data
            });
        }
    }).catch((err) => alert(err.response.data.message));
};

//학생 도서 대여 목록
export const getBorrowStdBookList = (
    std_id
    ) => async(dispatch) => {
    await axios.get(`${url}/mypage_std_borrow_list`, {
        std_id: std_id
    }, {
        headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
    }).then((res) => {
        if(res.data.status==="OK") {
            dispatch({
                type: GETBORROWSTDBOOKLIST,
                payload: res.data.data
            });
        }
    }).catch((err) => alert(err.response.data.message));
};


//reducer
const userBook = (state = INIT_USERBOOK_STATE, action) => {
    switch(action.type) {

        case CREATESTDBOOK:
            return { 
                ...state
            };
        case DELETESTDBOOK:
            return {
                ...state
            };
        case GETMYBOOKLIST:
            return {
                ...state,
                book_list: action.payload
            };
        case GETBORROWSTDBOOKLIST:
            return {
                ...state,
                borrow_book_list: action.payload
            };
        
        default:
            return state;
    };
};

export default userBook;
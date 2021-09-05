import axios from 'axios';

const url = process.env.REACT_APP_SERVER;

//initial state
const INIT_ADMIN_STATE = {
    search_result: [],  //libb_code, libb_title, libb_author, libb_publisher, libb_pub_date, libb_img, libb_state
    selected_book: {
        book: {
            libb_code: "",
            libb_title: "",
            libb_author: "",
            libb_publisher: "",
            libb_pub_date: "",
            libb_state: false,
            libb_isbn: "",
            libb_barcode: "",
            libb_ret_date: "",
            libb_class: "",
            borrower: "",
            libb_img: "",
            room: "",
            bookshelf: "",
            shelf: ""
        },
        locaiton: {
            class_sign: "",
            room: "",
            bookshelf: "",
            shelf: ""
        }
    }
};


//action type
const SEARCHBOOK = "SEARCHBOOK";
const GETBOOK = "GETBOOK";
const UPLOADIMG = "UPLOADIMG";
const CREATEBOOK = "CREATEBOOK";
const UPDATEBOOK = "UPDATEBOOK";
const DELETEBOOK = 'DELETEBOOK';
const RESET = 'RESET';

//도서 검색
export const searchBook = (
    keyword, history
    ) => async(dispatch) => {
    await axios.get(`${url}/admin/admin_search_book?keyword=${keyword}`,
    { withCredentials: true })
    .then((res) => {
        if(res.data.code===406) {
            alert(res.data.message);
            return history.push('/user/home');
        }
        else if(res.data.status==="OK") {
            dispatch({
                type: SEARCHBOOK,
                payload: res.data.data
            });
        } else {
            dispatch({
                type: SEARCHBOOK,
                payload: []
            });
        }
    }).catch((err) => console.error(err));
};

//도서 정보 가져오기
export const getBook = (
    libb_code, history
    ) => async(dispatch) => {
    await axios.get(`${url}/admin/admin_get_info?libb_code=${libb_code}`,
    { withCredentials: true })
    .then((res) => {
        if(res.data.code===406) {
            alert(res.data.message);
            return history.push('/user/home');
        }
        else if(res.data.status==="OK") {
            dispatch({
                type: GETBOOK,
                payload: res.data.data
            });
            history.push('/admin/update-book');
        } else {
            dispatch({
                type: GETBOOK,
                payload: []
            });
        }
    }).catch((err) => console.error(err));
};

//도서 이미지 등록
export const uploadImg = (
    formData
) => async() => {
    try {
        const res = await axios.post(`${url}/upload/libimg`, formData, { withCredentials: "true" });
        if(res.data.status==="OK") {
            return res.data.data.url;
        } else {
            return alert(res.data.message);
        }
    } catch(err) {
        console.error(err);
    };
};

//도서 정보 등록
export const createBook = (
    code, title, author, publisher, pubDate, state, isbn, barcode, classCode, room, bookshelf, shelf, imgUrl, history
) => async(dispatch) => {
    await axios.post(`${url}/admin/admin_create_book`, {
        libb_code: code,
        libb_title: title,
        libb_author: author,
        libb_publisher: publisher,
        libb_pub_date: pubDate,
        libb_state: state,
        libb_isbn: isbn,
        libb_barcode: barcode,
        libb_class: classCode,
        room: room,
        bookshelf: bookshelf,
        shelf: shelf,
        libb_img: imgUrl
    }, { withCredentials: "true" })
    .then((res) => {
        if(res.data.code===406) {
            alert(res.data.message);
            return history.push('/user/home');
        }
        else if(res.data.status==="OK") {
            dispatch({
                type: CREATEBOOK
            });
            alert(res.data.message);
            history.push('/admin/home');
        } else {
            alert(res.data.message);
        }
    }).catch((err) => console.log(err));
};

//도서 정보 수정
export const updateBook = (
    pre_code, libb_code, libb_title, libb_author, libb_publisher, libb_pub_date, libb_state, libb_isbn, libb_barcode, libb_img, libb_class, room, bookshelf, shelf, history
) => async() => {
    await axios.post(`${url}/admin/admin_update_book`, {
        pre_code, libb_code, libb_title, libb_author, libb_publisher, libb_pub_date, libb_state, libb_isbn, libb_barcode, libb_img, libb_class, room, bookshelf, shelf
    }, { withCredentials: true })
    .then((res) => {
        if(res.data.code===406) {
            alert(res.data.message);
            return history.push('/user/home');
        } else if(res.data.status==="OK") {
            alert("수정이 완료되었습니다.");
            history.push('/admin/home');
        } else {
            alert("도서 정보 수정 실패");
        }
    }).catch((err) => console.error(err));
};

//도서 정보 삭제
export const deleteBook = (
    libb_code, history
) => async() => {
    await axios.get(`${url}/admin/admin_delete_book?libb_code=${libb_code}`,
    { withCredentials: true })
    .then((res) => {
        if(res.data.code===406) {
            alert(res.data.message);
            return history.push('/user/home');
        }else if(res.data.status==="OK") {
            alert("삭제가 완료되었습니다.");
            history.push('/admin/home');
        } else {
            alert("도서 정보 삭제 실패");
        }
    }).catch((err) => console.error(err));
};

//리덕스 리셋
export const reset = () => async(dispatch) => {
    dispatch({
        type: RESET
    });
};


//reducer
const admin = (state = INIT_ADMIN_STATE, action) => {
    switch(action.type) {

        case SEARCHBOOK:
            return { 
                ...state, 
                search_result: action.payload
            };
        case GETBOOK:
            return { 
                ...state, 
                search_result: [],
                selected_book: action.payload.selected_book
            };
        case UPLOADIMG:
            return {
                ...state
            };
        case CREATEBOOK:
            return {
                ...state
            };
        case UPDATEBOOK:
            return { 
                ...state, 
                selected_book: INIT_ADMIN_STATE.selected_book
            };
        case DELETEBOOK:
            return {
                ...state
            };
        case RESET:
            return {
                ...state,
                search_result: INIT_ADMIN_STATE.search_result,
                selected_book: INIT_ADMIN_STATE.selected_book
            };
        default:
            return state;
    };
};

export default admin;
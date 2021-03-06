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
}


//action type
const SEARCHBOOK = "SEARCHBOOK";
const GETBOOK = "GETBOOK";
const UPLOADIMG = "UPLOADIMG";
const CREATEBOOK = "CREATEBOOK";
const UPDATEBOOK = "UPDATEBOOK";
const DELETEBOOK = "DELETEBOOK";
const RESET = "RESET";

//도서 검색
export const searchBook = (
    keyword, 
    history
) => async(dispatch) => {
    try {
        const { 
            data: { 
                code, 
                message,
                status,
                data
            } 
        } = await axios.get(`${url}/admin/admin_search_book?keyword=${keyword}`, { withCredentials: true });
        
        if (code === 406) {
            alert(message);
            return history.push("/user/home");
        }
        else if (status === "OK") {
            dispatch({
                type: SEARCHBOOK,
                payload: data
            });
        } else {
            dispatch({
                type: SEARCHBOOK,
                payload: []
            });
        }
    } catch (err) {
        return console.error(err);
    }
}

//도서 정보 가져오기
export const getBook = (
    libb_code, 
    history
) => async(dispatch) => {
    try {
        const { 
            data: { 
                code, 
                message,
                status,
                data
            }
        } = await axios.get(`${url}/admin/admin_get_info?libb_code=${libb_code}`, { withCredentials: true });

        if (code === 406) {
            alert(message);
            return history.push("/user/home");
        }
        else if (status === "OK") {
            dispatch({
                type: GETBOOK,
                payload: data
            });
            return history.push("/admin/update-book");
        } else {
            dispatch({
                type: GETBOOK,
                payload: []
            });
        }
    } catch (err) {
        return console.error(err);
    }
}

//도서 이미지 등록
export const uploadImg = (
    formData
) => async() => {
    try {
        const { 
            data: { 
                message,
                status,
                data
            }
        } = await axios.post(`${url}/upload/libimg`, formData, { withCredentials: "true" });

        if (status === "OK") {
            return data.url;
        } else {
            return alert(message);
        }
    } catch (err) {
        return console.error(err);
    }
}

//도서 정보 등록
export const createBook = (
    code, 
    title, 
    author, 
    publisher, 
    pubDate, 
    state, 
    isbn, 
    barcode, 
    classCode, 
    room, 
    bookshelf, 
    shelf, 
    imgUrl, 
    history
) => async(dispatch) => {
    try {
        const { data } = await axios.post(`${url}/admin/admin_create_book`, {
            libb_code: code,
            libb_title: title,
            libb_author: author,
            libb_publisher: publisher,
            libb_pub_date: pubDate,
            libb_state: state,
            libb_isbn: isbn,
            libb_barcode: barcode,
            libb_class: classCode,
            room,
            bookshelf,
            shelf,
            libb_img: imgUrl
        }, { 
            withCredentials: "true" 
        });

        if (data.code === 406) {
            alert(data.message);
            return history.push("/user/home");
        }
        else if (data.status === "OK") {
            dispatch({
                type: CREATEBOOK
            });
            alert(data.message);
            return history.push("/admin/home");
        } else {
            return alert(data.message);
        }
    } catch (err) {
        return console.log(err);
    }
}

//도서 정보 수정
export const updateBook = (
    pre_code, 
    libb_code, 
    libb_title, 
    libb_author, 
    libb_publisher, 
    libb_pub_date, 
    libb_state, 
    libb_isbn, 
    libb_barcode, 
    libb_img, 
    libb_class, 
    room, 
    bookshelf, 
    shelf, 
    history
) => async() => {
    try {
        const { 
            data: { 
                code, 
                message,
                status
            }
        } = await axios.post(`${url}/admin/admin_update_book`, {
            pre_code, 
            libb_code, 
            libb_title, 
            libb_author, 
            libb_publisher, 
            libb_pub_date, 
            libb_state, 
            libb_isbn, 
            libb_barcode, 
            libb_img, 
            libb_class, 
            room, 
            bookshelf, 
            shelf
        }, { 
            withCredentials: true 
        });

        if (code === 406) {
            alert(message);
            return history.push("/user/home");
        } else if (status === "OK") {
            alert("수정이 완료되었습니다.");
            return history.push("/admin/home");
        } else {
            return alert("도서 정보 수정 실패");
        }
    } catch (err) {
        return console.error(err);
    }
}

//도서 정보 삭제
export const deleteBook = (
    libb_code, 
    history
) => async() => {
    try {
        const { 
            data: { 
                code, 
                message,
                status
            }
        } = await axios.get(`${url}/admin/admin_delete_book?libb_code=${libb_code}`, { withCredentials: true });

        if (code === 406) {
            alert(message);
            return history.push("/user/home");
        } else if (status === "OK") {
            alert("삭제가 완료되었습니다.");
            return history.push("/admin/home");
        } else {
            return alert("도서 정보 삭제 실패");
        }
    } catch (err) {
        return console.error(err);
    }
}

//리덕스 리셋
export const resetAdmin = () => (dispatch) => {
    dispatch({
        type: RESET
    });
}


//reducer
const admin = (state = INIT_ADMIN_STATE, action) => {
    switch(action.type) {

        case SEARCHBOOK:
            return { 
                ...state, 
                search_result: action.payload
            }
        case GETBOOK:
            return { 
                ...state, 
                search_result: [],
                selected_book: action.payload.selected_book
            }
        case UPLOADIMG:
            return state;
        case CREATEBOOK:
            return state;
        case UPDATEBOOK:
            return { 
                ...state, 
                selected_book: INIT_ADMIN_STATE.selected_book
            }
        case DELETEBOOK:
            return state;
        case RESET:
            return INIT_ADMIN_STATE;
        default:
            return state;
    }
}

export default admin;
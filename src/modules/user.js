import axios from 'axios';
import { resetAdmin } from './admin';
import { resetChat } from './chat';
import { resetLibbook } from './libBook';
import { resetUserbook } from './userBook';

const url = process.env.REACT_APP_SERVER;

//initial state
const INIT_USER_STATE = {
    user: {
        token: "",
        std_num: 0,
        name: "",
        dept: ""
    }
};


//action type
const REGISTER = "REGISTER";
const LOGIN = "LOGIN";
const FINDPW = "FINDPW";
const LOGOUT = "LOGOUT";

//회원가입
export const register = (
    std_num, 
    name, 
    dept, 
    gender, 
    ph_num, 
    email, 
    password, 
    navigate
) => async(dispatch) => {
    try {
        const {
            data: {
                code,
                message
            }
        } = await axios.post(`${url}/auth/join`, {
            std_num, 
            name, 
            dept, 
            gender, 
            ph_num, 
            email, 
            password
        }, { 
            withCredentials: true 
        })
        
        if (code === 200) {
            dispatch({
                type: REGISTER
            });
            navigate("/login");
        }
        return alert(message);
    } catch (err) {
        return console.log(err);
    }
}

//로그인
export const login = (
    std_num, 
    password, 
    navigate
) => async(dispatch) => {
    try {
        const {
            data: {
                code,
                message,
                data
            }
        } = await axios.post(`${url}/auth/login`, {
            std_num: std_num, 
            password: password
        }, { 
            withCredentials: true 
        });
        
        if (code === 200) {
            dispatch({
                type: LOGIN,
                payload: {
                    std_num: std_num,
                    name: data.name,
                    dept: data.dept
                }
            });
            return navigate("/user/home");
        } else if (code === 20911) {
            dispatch({
                type: LOGIN,
                payload: {
                    std_num: std_num,
                    name: data.name,
                    dept: data.dept
                }
            });
            return navigate("/admin/home");
        } else {
            return alert(message);
        }
    } catch (err) {
        return console.log(err);
    }
}

//비밀번호 찾기
export const findPw = (
    std_num, 
    name, 
    ph_num, 
    email, 
    navigate
) => async(dispatch) => {
    try {
        const {
            data: {
                code,
                message
            }
        } = await axios.post(`${url}/mail/findpw`, {
            std_num,
            name,
            ph_num,
            email
        }, { 
            withCredentials: true 
        });
        
        if (code === 200) {
            dispatch({
                type: FINDPW
            });
            return navigate("/user1/find_pw_res");
        } else {
            return alert(message);
        }
    } catch (err) {
        return console.log(err);
    }
}

//로그아웃
export const logout = (
    navigate
) => async(dispatch) => {
    try {
        const {
            data: {
                code
            }
        } = await axios.get(`${url}/auth/logout`, { withCredentials: true });

        if (code === 200) {
            dispatch({
                type: LOGOUT
            });
            dispatch(resetAdmin());
            dispatch(resetChat());
            dispatch(resetLibbook());
            dispatch(resetUserbook());
        } else {
            alert("이미 로그아웃 상태입니다.");
        }
        return navigate("/login");
    } catch (err) {
        return console.log(err);
    }
}


//reducer
const user = (state = INIT_USER_STATE, action) => {
    switch(action.type) {

        case REGISTER:
            return state;
        case LOGIN:
            return {
                ...state,
                user: action.payload
            }
        case FINDPW:
            return state;
        case LOGOUT:
            return INIT_USER_STATE;
        
        default:
            return state;
    }
}

export default user;
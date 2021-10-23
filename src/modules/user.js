import axios from 'axios';
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
    history
) => async(dispatch) => {
    try {
        const res = await axios.post(`${url}/auth/join`, {
            std_num: std_num, 
            name: name, 
            dept: dept, 
            gender: gender, 
            ph_num: ph_num, 
            email: email, 
            password: password
        }, { 
            withCredentials: true 
        })
        
        if (res.data.code === 200) {
            dispatch({
                type: REGISTER
            });
            history.push("/login");
        }
        return alert(res.data.message);
    } catch (err) {
        return console.log(err);
    }
}

//로그인
export const login = (
    std_num, 
    password, 
    history
) => async(dispatch) => {
    try {
        const res = await axios.post(`${url}/auth/login`, {
            std_num: std_num, 
            password: password
        }, { 
            withCredentials: true 
        });
        
        if (res.data.code  ===200) {
            dispatch({
                type: LOGIN,
                payload: {
                    std_num: std_num,
                    name: res.data.data.name,
                    dept: res.data.data.dept
                }
            });
            return history.push("/user/home");
        } else if (res.data.code === 20911) {
            dispatch({
                type: LOGIN,
                payload: {
                    std_num: std_num,
                    name: res.data.data.name,
                    dept: res.data.data.dept
                }
            });
            return history.replace("/admin/home");
        } else {
            return alert(res.data.message);
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
    history
) => async(dispatch) => {
    try {
        const res = await axios.post(`${url}/mail/findpw`, {
            std_num: std_num,
            name: name,
            ph_num: ph_num,
            email: email
        }, { 
            withCredentials: true 
        });
        
        if (res.data.code === 200) {
            dispatch({
                type: FINDPW
            });
            return history.push("/user1/find_pw_res");
        } else {
            return alert(res.data.message);
        }
    } catch (err) {
        return console.log(err);
    }
}

//로그아웃
export const logout = (
    history
) => async(dispatch) => {
    try {
        const res = await axios.get(`${url}/auth/logout`, { withCredentials: true });

        if (res.data.code === 200) {
            dispatch({
                type: LOGOUT
            });
        } else {
            alert("이미 로그아웃 상태입니다.");
        }
        return history.push("/login");
    } catch (err) {
        return console.log(err);
    }
}


//reducer
const user = (state = INIT_USER_STATE, action) => {
    switch(action.type) {

        case REGISTER:
            return { 
                ...state
            }
        case LOGIN:
            return {
                ...state,
                user: action.payload
            }
        case FINDPW:
            return {
                ...state
            }
        case LOGOUT:
            return {
                ...state,
                user: INIT_USER_STATE.user
            }
        
        default:
            return state;
    }
}

export default user;
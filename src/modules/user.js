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
    std_num, name, dept, gender, ph_num, email, password, history
    ) => async(dispatch) => {
    await axios.post(`${url}/auth/join`, {
        std_num: std_num, 
        name: name, 
        dept: dept, 
        gender: gender, 
        ph_num: ph_num, 
        email: email, 
        password: password
    },{ withCredentials: true })
    .then((res) => {
        if(res.data.code===200) {
            dispatch({
                type: REGISTER
            });
            history.push('/login');
        }
        alert(res.data.message);
    }).catch((err) => console.log(err));
};

//로그인
export const login = (
    std_num, password, history
    ) => async(dispatch) => {
    await axios.post(`${url}/auth/login`, {
        std_num: std_num, 
        password: password
    }, { withCredentials: true })
    .then((res) => {
        if(res.data.code===200) {
            dispatch({
                type: LOGIN,
                payload: {
                    std_num: std_num,
                    name: res.data.data.name,
                    dept: res.data.data.dept
                }
            });
            history.push('/user/home');
        } else if(res.data.code===20911) {
            dispatch({
                type: LOGIN,
                payload: {
                    std_num: std_num,
                    name: res.data.data.name,
                    dept: res.data.data.dept
                }
            });
            history.replace('/admin/home');
        } else {
            alert(res.data.message);
        }
    }).catch((err) => console.log(err));
};

//비밀번호 찾기
export const findPw = (
    std_num, name, ph_num, email, history
    ) => async(dispatch) => {
    await axios.post(`${url}/mail/findpw`, {
        std_num: std_num,
        name: name,
        ph_num: ph_num,
        email: email
    },{ withCredentials: true })
    .then((res) => {
        if(res.data.code===200) {
            dispatch({
                type: FINDPW
            });
            history.push('/user1/find_pw_res');
        } else {
            alert(res.data.message);
        }
    }).catch((err) => console.log(err));
};

//로그아웃
export const logout = (
    history
    ) => async(dispatch) => {
    await axios.get(`${url}/auth/logout`
    , { withCredentials: true })
    .then((res) => {
        if(res.data.code===200) {
            dispatch({
                type: LOGOUT
            });
        } else {
            alert("이미 로그아웃 상태입니다.");
        }
        history.push('/login');
    }).catch((err) => console.log(err));
};


//reducer
const user = (state = INIT_USER_STATE, action) => {
    switch(action.type) {

        case REGISTER:
            return { 
                ...state
            };
        case LOGIN:
            return {
                ...state,
                user: action.payload
            };
        case FINDPW:
            return {
                ...state
            };
        case LOGOUT:
            return {
                ...state,
                user: INIT_USER_STATE.user
            };
        
        default:
            return state;
    };
};

export default user;
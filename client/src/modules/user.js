import axios from 'axios';
const url = process.env.REACT_APP_SERVER;

//initial state
const INIT_USER_STATE = {
    user: {
        token: "",
        std_id: 0,
        name: "",
        dept: ""
    }
};


//action type
const REGISTER = "REGISTER";
const LOGIN = "LOGIN";

//회원가입
export const register = (
    std_id, name, dept, gender, phone, email, pw
    ) => async(dispatch) => {
    await axios.post(`${url}/register`, {
        std_id: std_id,
        name: name,
        dept: dept,
        gender: gender,
        phone: phone,
        email: email,
        pw: pw
    }, {
        headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
    }).then((res) => {
        if(res.data.status==="OK") {
            dispatch({
                type: REGISTER
            });
            alert(res.data.message);
            history.push('/login');
        }
    }).catch((err) => alert(err.response.data.message));
};

//로그인
export const login = (
    std_id, pw
    ) => async(dispatch) => {
    await axios.post(`${url}/register`, {
        std_id: std_id,
        pw: pw
    }, {
        headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
    }).then((res) => {
        if(res.data.status==="OK") {
            dispatch({
                type: LOGIN,
                payload: res.data.data
            });
            localStorage.setItem("token", res.data.data.token);
            history.push('/home');
        }
    }).catch((err) => alert(err.response.data.message));
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
        
        default:
            return state;
    };
};

export default user;
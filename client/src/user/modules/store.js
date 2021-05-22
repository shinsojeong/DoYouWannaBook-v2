import { combineReducers } from 'redux';
import chat from './chat';
import libBook from './libBook';
import user from './user';
import userBook from './userBook';

const rootReducer = combineReducers({
    chat, libBook, user, userBook
});

export default rootReducer;
import { combineReducers } from 'redux';
import admin from './admin';
import chat from './chat';
import libBook from './libBook';
import topBar from './topBar';
import user from './user';
import userBook from './userBook';

const rootReducer = combineReducers({
    admin, chat, libBook, topBar, user, userBook
});

export default rootReducer;
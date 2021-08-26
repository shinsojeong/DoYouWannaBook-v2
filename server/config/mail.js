import dotenv from 'dotenv'
dotenv.config();
const env = process.env;

const mail = {
    user: env.MAILACCOUNT,
    password: env.MAILPASSWORD
};

export default mail;
import Sequelize from 'sequelize';
import Chat from './chat.mjs';
import Libbook from './libbook.mjs';
import Libclass from './libclass.mjs';
import Message from './message.mjs';
import Stdbook from './stdbook.mjs';
import User from './user.mjs';

//const env = process.env.NODE_ENV || 'development';
import { development } from '../config/config.mjs';
//config[env];
const db = {};

const sequelize = new Sequelize(development.database, development.username, development.password, development);
db.sequelize = sequelize;

db.Chat = Chat;
db.Libbook = Libbook;
db.Libclass = Libclass;
db.Message = Message;
db.Stdbook = Stdbook;
db.User = User;

Chat.init(sequelize);
Libbook.init(sequelize);
Libclass.init(sequelize);
Message.init(sequelize);
Stdbook.init(sequelize);
User.init(sequelize);

Chat.associate(db);
Libbook.associate(db);
Libclass.associate(db);
Message.associate(db);
Stdbook.associate(db);
User.associate(db);

export default db;
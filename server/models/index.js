import Sequelize from 'sequelize';
import Chat from './chat.js';
import Libbook from './libbook.js';
import Libclass from './libclass.js';
import Message from './message.js';
import Stdbook from './stdbook.js';
import User from './user.js';

//const env = process.env.NODE_ENV || 'development';
import { development } from '../config/config.js';
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
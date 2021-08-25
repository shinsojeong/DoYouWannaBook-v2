import Sequelize from 'sequelize';
import Chat from './chat.js';
import Libbook from './libbook.js';
import Libclass from './libclass.js';
import Libimg from './libimg.js';
import Message from './message.js';
import Stdbook from './stdbook.js';
import Stdimg from './stdimg.js';
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
db.Libimg = Libimg;
db.Message = Message;
db.Stdbook = Stdbook;
db.Stdimg = Stdimg;
db.User = User;

Chat.init(sequelize);
Libbook.init(sequelize);
Libclass.init(sequelize);
Libimg.init(sequelize);
Message.init(sequelize);
Stdbook.init(sequelize);
Stdimg.init(sequelize);
User.init(sequelize);

Chat.associate(db);
Libbook.associate(db);
Libclass.associate(db);
Libimg.associate(db);
Message.associate(db);
Stdbook.associate(db);
Stdimg.associate(db);
User.associate(db);

export default db;
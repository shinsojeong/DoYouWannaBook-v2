const Sequelize = require('sequelize');
const Chat = require('./chat');
const Libbook = require('./libbook');
const Libclass = require('./libclass');
const Libimg = require('./libimg');
const Message = require('./message');
const Stdbook = require('./stdbook');
const Stdimg = require('./stdimg');
const User = require('./user');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
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

module.exports = db;
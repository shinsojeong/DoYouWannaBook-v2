const { Sequelize } = require('sequelize');

module.exports = class Message extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            msg_code: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                unique: true,
                autoIncrement: true
            },
            msg: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW
            }
        }, {
            sequelize,
            timestamps: false,  //createAt, updateAt 추가
            underscored: false,  //snake case 옵션
            modelName: 'Message',
            tableName: 'messages',
            paranoid: false,  //deleteAt 추가
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Message.belongsTo(db.Chat, { foreignKey: 'chat', targetKey: 'chat_code' });
        db.Message.belongsTo(db.User, { foreignKey: 'sender', targetKey: 'std_num' });
    }
};
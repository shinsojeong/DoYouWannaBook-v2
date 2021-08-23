const { Sequelize } = require('sequelize');

module.exports = class Chat extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            chat_code: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                unique: true,
                autoIncrement: true
            }
        }, {
            sequelize,
            timestamps: true,  //createAt, updateAt 추가
            underscored: false,  //snake case 옵션
            modelName: 'Chat',
            tableName: 'Chats',
            paranoid: false,  //deleteAt 추가
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Chat.belongsTo(db.User, { foreignKey: 'part1', targetKey: 'std_num' });
        db.Chat.belongsTo(db.User, { foreignKey: 'part2', targetKey: 'std_num' });
        db.Chat.hasMany(db.Message, { foreignKey: 'chat', sourceKey: 'chat_code' });
    }
};
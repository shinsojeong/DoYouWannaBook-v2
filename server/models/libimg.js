const { Sequelize } = require('sequelize');

module.exports = class Libimg extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            libb_title: {
                type: Sequelize.STRING(40),
                allowNull: false
            },
            libb_author: {
                type: Sequelize.STRING(30),
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,  //createAt, updateAt 추가
            underscored: false,  //snake case 옵션
            modelName: 'Libimg',
            tableName: 'libimgs',
            paranoid: false,  //deleteAt 추가
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Libimg.belongsTo(db.Libbook, { foreignKey: 'libb_code', targetKey: 'libb_code' });
    }
};
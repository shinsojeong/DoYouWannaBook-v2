const { Sequelize } = require('sequelize');

module.exports = class Libbook extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            libb_code: {
                type: Sequelize.STRING(15),
                allowNull: false,
                unique: true
            },
            libb_title: {
                type: Sequelize.STRING(40),
                allowNull: false
            },
            libb_author: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            libb_publisher: {
                type: Sequelize.STRING(40),
                allowNull: false
            },
            libb_pub_date: {
                type: Sequelize.DATE,
                allowNull: false
            },
            libb_state: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            libb_isbn: {
                type: Sequelize.DECIMAL,
                allowNull: false
            },
            libb_barcode: {
                type: Sequelize.DECIMAL,
                allowNull: false
            },
            libb_ret_date: {
                type: Sequelize.DATE,
                allowNull: true
            }
        }, {
            sequelize,
            timestamps: false,  //createAt, updateAt 추가
            underscored: false,  //snake case 옵션
            modelName: 'Libbook',
            tableName: 'libbooks',
            paranoid: false,  //deleteAt 추가
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Libbook.belongsTo(db.Libclass, { foreignKey: 'libb_class', targetKey: 'class_sign' });
        db.Libbook.hasOne(db.Libimg, { foreignKey: 'libb_code', sourceKey: 'libb_code'});
        db.Libbook.belongsTo(db.User, { foreignKey: 'borrower', targetKey: 'std_num'});
    }
};
import { Sequelize } from 'sequelize';

export default class Libclass extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            class_sign: {
                type: Sequelize.STRING(6),
                allowNull: false,
                primaryKey: true
            },
            room: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            bookshelf: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            shelf: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,  //createAt, updateAt 추가
            underscored: false,  //snake case 옵션
            modelName: 'Libclass',
            tableName: 'Libclasses',
            paranoid: false,  //deleteAt 추가
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Libclass.hasMany(db.Libbook, { foreignKey: 'libb_class', targetKey: 'class_sign' });
    }
};
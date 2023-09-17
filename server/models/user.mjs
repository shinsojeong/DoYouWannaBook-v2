import { Sequelize } from 'sequelize';

export default class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            std_num: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                unique: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            dept: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            gender: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            ph_num: {
                type: Sequelize.STRING(11),
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            provider: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'local'
            },
            sns_id: {
                type: Sequelize.STRING(30),
                allowNull: true
            },
            auth: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: 0
            },
        }, {
            sequelize,
            timestamps: false,  //createAt, updateAt 추가
            underscored: false,  //snake case 옵션
            modelName: 'User',
            tableName: 'users',
            paranoid: false,  //deleteAt 추가
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.User.hasMany(db.Chat, { foreignKey: 'part1', sourceKey: 'std_num' });
        db.User.hasMany(db.Chat, { foreignKey: 'part2', sourceKey: 'std_num' });
        db.User.hasMany(db.Message, { foreignKey: 'sender', sourceKey: 'std_num'});
        db.User.hasMany(db.Stdbook, { foreignKey: 'lender', sourceKey: 'std_num' });
        db.User.hasMany(db.Stdbook, { foreignKey: 'borrower', sourceKey: 'std_num' });
        db.User.hasMany(db.Libbook, { foreignKey: 'borrower', sourceKey: 'std_num' });
    }
};
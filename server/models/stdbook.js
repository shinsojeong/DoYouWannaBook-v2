import { Sequelize } from 'sequelize';

export default class Stdbook extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            stdb_code: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                unique: true,
                primaryKey: true
            },
            stdb_title: {
                type: Sequelize.STRING(40),
                allowNull: false
            },
            stdb_author: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            stdb_publisher: {
                type: Sequelize.STRING(40),
                allowNull: false
            },
            stdb_pub_date: {
                type: Sequelize.DATE,
                allowNull: false
            },
            stdb_rental_date: {
                type: Sequelize.DATE,
                allowNull: false
            },
            stdb_rental_fee: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            stdb_state: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            stdb_comment: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            stdb_ret_date: {
                type: Sequelize.DATE,
                allowNull: true
            },
            stdb_img: {
                type: Sequelize.STRING(200),
                allowNull: true
            }
        }, {
            sequelize,
            timestamps: false,  //createAt, updateAt 추가
            underscored: false,  //snake case 옵션
            modelName: 'Stdbook',
            tableName: 'Stdbooks',
            paranoid: false,  //deleteAt 추가
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Stdbook.belongsTo(db.User, { foreignKey: 'lender', targetKey: 'std_num' });
        db.Stdbook.belongsTo(db.User, { foreignKey: 'borrower', targetKey: 'std_num' });  //참고 allowNull: true
    }
};
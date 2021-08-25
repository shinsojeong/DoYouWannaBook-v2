import { Sequelize } from 'sequelize';

export default class Stdimg extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            stdb_img: {
                type: Sequelize.BLOB("long"),
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,  //createAt, updateAt 추가
            underscored: false,  //snake case 옵션
            modelName: 'Stdimg',
            tableName: 'Stdimgs',
            paranoid: false,  //deleteAt 추가
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Stdimg.belongsTo(db.Stdbook, { foreignKey: 'stdb', targetKey: 'stdb_code', primaryKey: true });
    }
};
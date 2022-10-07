module.exports = (sequelize, Sequelize) => {
    const TBL_UserTypeCodes = sequelize.define("TBL_UserTypeCodes", {
        userTypeCodeId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        userType: {
            type: Sequelize.ENUM('White Label', 'Super Distributor', 'Distributor', 'retailer', 'API'),
            field: 'UserType'
        },

    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_UserTypeCodes.removeAttribute('id');
    return TBL_UserTypeCodes;
};
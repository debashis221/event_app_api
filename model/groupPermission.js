module.exports = (sequelize, Sequelize) => {
    const TBL_GroupPermissions = sequelize.define("TBL_GroupPermissions", {
        groupPermissionId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },

    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_GroupPermissions.removeAttribute('id');
    return TBL_GroupPermissions;
};
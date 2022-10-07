module.exports = (sequelize, Sequelize) => {
    const TBL_PermissionTypes = sequelize.define("TBL_PermissionTypes", {
        permissionTypeId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        permissionName: {
            type: Sequelize.STRING(255),
            field: 'PermissionName'
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_PermissionTypes.removeAttribute('id');
    return TBL_PermissionTypes;
};
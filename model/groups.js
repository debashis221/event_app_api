module.exports = (sequelize, Sequelize) => {
    const TBL_Groups = sequelize.define("TBL_Groups", {
        groupId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        groupName: {
            type: Sequelize.STRING(255),
            unique: true,
            field: 'GroupName'
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_Groups.removeAttribute('id');
    return TBL_Groups;
};
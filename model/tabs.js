module.exports = (sequelize, Sequelize) => {
    const TBL_Tabs = sequelize.define("TBL_Tabs", {
        tabId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        tabName: {
            type: Sequelize.STRING(255),
            unique: true,
            field: 'TabName'
        },
        tabCode: {
            type: Sequelize.STRING(255),
            field: 'TabCode'
        },
        logo: {
            type: Sequelize.STRING(500),
            field: 'Logo'
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_Tabs.removeAttribute('id');
    return TBL_Tabs;
};
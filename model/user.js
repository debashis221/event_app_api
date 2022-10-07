module.exports = (sequelize, Sequelize) => {
  const TBL_Users = sequelize.define(
    "TBL_Users",
    {
      Id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      userName: {
        type: Sequelize.STRING(255),
        field: "UserName",
        allowNull: false,
      },
      emailId: {
        type: Sequelize.STRING(255),
        unique: true,
        field: "EmailId",
        allowNull: false,
      },
      Password: {
        type: Sequelize.STRING(20),
        field: "Password",
        allowNull: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        field: "IsActive",
        allowNull: false,
      },
    },
    {
      frezeTableName: true,
      caseFile: "p",
      caseProp: "C",
      timestamps: true,
    }
  );
  TBL_Users.removeAttribute("id");
  return TBL_Users;
};

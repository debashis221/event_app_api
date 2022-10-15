module.exports = (sequelize, Sequelize) => {
  const TBL_Contact = sequelize.define(
    "TBL_Contact",
    {
      Id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(255),
        field: "name",
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        field: "email",
        allowNull: false,
      },
      comments: {
        type: Sequelize.STRING(255),
        field: "comments",
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
  TBL_Contact.removeAttribute("id");
  return TBL_Contact;
};

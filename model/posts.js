module.exports = (sequelize, Sequelize) => {
  const TBL_Posts = sequelize.define(
    "TBL_Posts",
    {
      Id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      postName: {
        type: Sequelize.STRING(255),
        field: "postName",
        allowNull: false,
      },
      postDescription: {
        type: Sequelize.STRING(255),
        field: "postDesc",
        allowNull: false,
      },
      thumbnailImage: {
        type: Sequelize.STRING(255),
        field: "thumbnailImage",
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING(255),
        field: "Image",
        allowNull: true,
      },
    },
    {
      frezeTableName: true,
      caseFile: "p",
      caseProp: "C",
      timestamps: true,
    }
  );
  TBL_Posts.removeAttribute("id");
  return TBL_Posts;
};

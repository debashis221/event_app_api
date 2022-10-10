module.exports = (sequelize, Sequelize) => {
  const TBL_Gallery = sequelize.define(
    "TBL_Gallery",
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

      image: {
        type: Sequelize.STRING(255),
        field: "image",
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
  TBL_Gallery.removeAttribute("id");
  return TBL_Gallery;
};

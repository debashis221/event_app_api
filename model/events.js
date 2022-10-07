module.exports = (sequelize, Sequelize) => {
  const TBL_Events = sequelize.define(
    "TBL_Events",
    {
      Id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      eventName: {
        type: Sequelize.STRING(255),
        field: "EventName",
        allowNull: false,
      },
      eventDescription: {
        type: Sequelize.STRING(255),
        field: "EventDescription",
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(255),
        field: "Address",
        allowNull: false,
      },
      bookUrl: {
        type: Sequelize.STRING(255),
        field: "BookUrl",
        allowNull: false,
      },
      long: {
        type: Sequelize.STRING(255),
        field: "Longitude",
        allowNull: false,
      },
      lat: {
        type: Sequelize.STRING(255),
        field: "Lattitude",
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING(255),
        field: "Image",
        allowNull: true,
      },
      youtubeUrl: {
        type: Sequelize.STRING(255),
        field: "YTUrl",
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
  TBL_Events.removeAttribute("id");
  return TBL_Events;
};

var Sequelize = require("sequelize"); //sequelize module import
var fs = require("fs"); //fs module import
var path = require("path"); //path module import

const env = process.env.NODE_ENV || "local"; //process env or DEVELOPMENT in default. development
const config = require("../config/config.json")[env];

//connection instances creation for SQl with sequelize.
const sequelize = new Sequelize(
  "postgres://eventappapi_user:jfXfnB4w1KPxAcLDnLyXyVQYKFM4ZVhP@dpg-cj19bldph6enmk126g4g-a.frankfurt-postgres.render.com/eventappapi?ssl=true"
);

var db = {};

fs.readdirSync(__dirname)
  .filter(function (file) {
    return file.indexOf(".") !== 0 && file !== "index.js";
  })
  .forEach(function (file) {
    // var model = sequelize.import(path.join(__dirname, file));
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.TBL_Users.belongsTo(db.TBL_Groups, {
  as: "group",
  foreignKey: {
    name: "groupId",
  },
});

db.TBL_Groups.hasMany(db.TBL_Users, {
  as: "users",
  foreignKey: {
    name: "groupId",
  },
});

db.TBL_Users.belongsTo(db.TBL_UserTypeCodes, {
  as: "userTypeCode",
  foreignKey: {
    name: "userTypeCodeId",
  },
});

db.TBL_UserTypeCodes.hasMany(db.TBL_Users, {
  as: "users",
  foreignKey: {
    name: "userTypeCodeId",
  },
});

db.TBL_GroupPermissions.belongsTo(db.TBL_Groups, {
  as: "group",
  foreignKey: {
    name: "groupId",
  },
});

db.TBL_Groups.hasMany(db.TBL_GroupPermissions, {
  as: "permission",
  foreignKey: {
    name: "groupId",
  },
});

db.TBL_GroupPermissions.belongsTo(db.TBL_Tabs, {
  as: "tab",
  foreignKey: {
    name: "tabId",
  },
});

db.TBL_Tabs.hasMany(db.TBL_GroupPermissions, {
  as: "permission",
  foreignKey: {
    name: "tabId",
  },
});

db.TBL_GroupPermissions.belongsTo(db.TBL_PermissionTypes, {
  as: "permissionType",
  foreignKey: {
    name: "permissionTypeId",
  },
});

db.TBL_PermissionTypes.hasMany(db.TBL_GroupPermissions, {
  as: "permissions",
  foreignKey: {
    name: "permissionTypeId",
  },
});

module.exports = db;

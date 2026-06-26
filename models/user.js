'use strict';
const bcrypt = require("bcryptjs");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    

    static associate(models) {
      // define association here
      User.hasMany(models.Post, {
        foreignKey: 'UserId',
      });

      User.hasOne(models.UserProfile, {
        foreignKey: 'UserId',
      });
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user) => {

    user.password = bcrypt.hashSync(user.password, 10);

  });




  return User;
};
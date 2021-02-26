'use strict'

const {DataTypes} = require('sequelize');
const sequelize = require('../../config/settings')

var current = new Date();

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: current
    },
}, {});

const UserDetails = sequelize.define('user_details', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    jobTitle: { type: DataTypes.STRING },
    salary: { type: DataTypes.INTEGER },
    doj: { type: DataTypes.DATE },
    education: { type: DataTypes.STRING },
    dob: { type: DataTypes.DATE, },
    city: { type: DataTypes.STRING },
});
UserDetails.belongsTo(User);

module.exports = {
    userModel: User,
    userDetailModel: UserDetails
};

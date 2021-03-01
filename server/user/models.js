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
    imageType: DataTypes.STRING,
    imageName: DataTypes.STRING,
    imageData: DataTypes.BLOB('long'),
    jobTitle: DataTypes.STRING,
    salary: DataTypes.INTEGER,
    doj: DataTypes.DATE,
    education: DataTypes.STRING,
    dob: DataTypes.DATE,
    city: DataTypes.STRING,
});
UserDetails.belongsTo(User);

module.exports = {
    userModel: User,
    userDetailModel: UserDetails
};

const {Sequelize} = require('sequelize');
const config = require('../config/config.json')

var sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
        dialect: 'postgres',
        define: {
            freezeTableName: true,
            timestamps: false
        }
});

// sync db
// sequelize.sync({force: true});

module.exports = sequelize;

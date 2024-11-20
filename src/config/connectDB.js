const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('demo1', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

const connectDB = async () => {
    try {
        await sequelize.authenticate(); // Use await correctly
        console.log('Kết nối thành công tới Database');
    } catch (error) {
        console.error('Chưa kết nối đến Database:', error);
    }
};

module.exports = connectDB;

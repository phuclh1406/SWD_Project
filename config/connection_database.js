const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('uuacyt2ejjgpgzw4', 'us4zqsaqbcsdmgwb', 'obkcazvwd8guv7ia', {
  host: 'g84t6zfpijzwx08q.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  dialect: 'mysql',
  logging: false,
});

const connectionDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

connectionDatabase();

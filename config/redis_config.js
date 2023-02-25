// const { createClient } = require('redis');

// const client = createClient({
//     password: 'KMIpIG55Yil135IokYcMiro0BbhLX4mj',
//     socket: {
//         host: 'redis-17376.c292.ap-southeast-1-1.ec2.cloud.redislabs.com',
//         port: 17376
//     }
// });

// const getOrSetCache = (key, cb) => new Promise((resolve, reject) => {
//     client.get( key, async (error, data) => {
//       if (error) return reject(error);
//       if (data != null) return resolve(JSON.parse(data));
//       const freshData = await cb();
//       client.setEx(key, 3600, JSON.stringify(freshData));
//       resolve(freshData);
//     })
//   });

// module.exports = getOrSetCache;
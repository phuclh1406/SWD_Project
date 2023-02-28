const { createClient } = require('redis');

const client = createClient({
    legacyMode: true,
    password: 'KMIpIG55Yil135IokYcMiro0BbhLX4mj',
    socket: {
        host: 'redis-17376.c292.ap-southeast-1-1.ec2.cloud.redislabs.com',
        port: 17376
    }
});

client.connect().catch(console.error);

module.exports = client;
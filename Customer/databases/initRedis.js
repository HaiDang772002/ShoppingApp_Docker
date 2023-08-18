const { createClient } = require('redis')
const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});
client.on("ready", () => {
    console.log("Connected to Redis!");
});

client.on("error", (err) => {
    console.log("Error in the Connection");
});
module.exports = client
const client = require('./databases/initRedis')
const redisTransaction = {
    setRedisData: async (key, value) => {
        await client.connect()
        await client.set(JSON.stringify(key), value).then(() => {
            console.log(`Set key ${key} successfully`)
        });
        client.quit()
    },
    getRedisData: async (key) => {
        await client.connect()
        const value = await client.get(JSON.stringify(key))
        await client.quit()
        return value
    }
}
module.exports = redisTransaction
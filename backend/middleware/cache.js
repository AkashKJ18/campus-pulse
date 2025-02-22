const redis = require('redis');
const client = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST || "redis",
        port: process.env.REDIS_PORT || 6379
    }
});
client.connect().then(() => console.log("✅ Connected to Redis")).catch(console.error);

const cacheMiddleware = (cacheKeyPrefix, expiry = 3600) => async (req, res, next) => {
    try {
        const cacheKey = `${cacheKeyPrefix}:${req.originalUrl}`;
        const cacheData = await client.get(cacheKey);

        if (cacheData) {
            return res.send(JSON.parse(cacheData));
        }

        const originalSend = res.send;
        res.send = async (body) => {
            await client.setEx(cacheKey, expiry, JSON.stringify(body));
            originalSend.call(res, body);
        };

        next();
    } catch (error) {
        console.log(error);
        next();
    }
};

module.exports = cacheMiddleware;
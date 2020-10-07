import redis from 'redis';
import bluebird from 'bluebird';

// bluebird.promisifyAll(redis.RedisClient.prototype);
// bluebird.promisifyAll(redis.Multi.prototype);
bluebird.promisifyAll(redis);

const redisClient: any = redis.createClient();

export default redisClient;
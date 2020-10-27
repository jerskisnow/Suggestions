import redis, { RedisClient } from 'redis';
import bluebird from 'bluebird';

export default class Redis {

    private static client: RedisClient;

    public static setupClient(): void {
        // bluebird.promisifyAll(redis.RedisClient.prototype);
        // bluebird.promisifyAll(redis.Multi.prototype);
        bluebird.promisifyAll(redis);
        
        this.client = redis.createClient();
    }

    public static getClient(): RedisClient {
        return this.client;
    }

}
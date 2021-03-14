import redis, { RedisClient } from 'redis';
import bluebird from 'bluebird';

export default class Redis {
    private static client: RedisClient;

    public static setupClient(): void {
        bluebird.promisifyAll(redis);
        this.client = redis.createClient();
    }

    public static getClient(): AsyncRedisClient {
        return this.client as AsyncRedisClient;
    }
}

interface AsyncRedisClient extends RedisClient {
    getAsync(identifier: string): Promise<any>,
    setAsync(identifier: string, value: any, option: string, optionValue: any): Promise<any>,
    delAsync(identifier: string): Promise<any>,
    existsAsync(identifier: string): Promise<any>
}

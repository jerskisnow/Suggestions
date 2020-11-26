import { Pool } from 'pg';
import botCache from './BotCache';

export default class PostgreSQL {

    private static pool: Pool;

    public static setupPool(): void {
        this.pool = new Pool({
            host: botCache.config.database.hostname,
            user: botCache.config.database.username,
            password: botCache.config.database.password,
            database: botCache.config.database.database,
            port: botCache.config.database.port,
            idleTimeoutMillis: 0,
            connectionTimeoutMillis: 0,
            max: 25
        });
    }

    public static async runQuery(query: string, params?: any[]) {
        const client = await this.pool.connect();
        const result = !params ? await client.query(query) : await client.query(query, params);
        client.release();
        return result;
    }

}
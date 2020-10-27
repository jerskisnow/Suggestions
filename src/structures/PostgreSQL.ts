import { Pool } from 'pg';

export default class PostgreSQL {

    private static pool: Pool;

    public static setupPool(): void {
        this.pool = new Pool({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: parseInt(process.env.DB_PORT),
            idleTimeoutMillis: 0,
            connectionTimeoutMillis: 0,
            max: 20
        });
    }

    public static getPool(): Pool {
        return this.pool;
    }

}
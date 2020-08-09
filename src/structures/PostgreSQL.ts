import { Pool } from 'pg';

const pool: Pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT),
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0,
    max: 20
});

export default pool;
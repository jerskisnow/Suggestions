import { Pool, QueryResult } from 'pg';

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

    public static query(txt: string, values: any[], callback?: (arg0: Error, arg1: QueryResult<any>) => void) {
        this.pool.connect((err, client, done) => {
            client.query(txt, values, (err, result) => {
                done();
                if (callback && typeof callback === 'function') {
                    callback(err, result);
                }
            });
        });
    }

}
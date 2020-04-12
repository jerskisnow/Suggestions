import { Client } from 'pg';

export default class PostgreSQL {

	// The client variable
	private client: Client;

	/**
	 * The constructor creates a new client on instantiation
	 * Use the getClient() function in order to get access to the client
	 */
	constructor() {
		this.client = new Client({
			user: process.env.DB_USERNAME,
			host: process.env.DB_HOST,
			database: process.env.DB_DATABASE,
			password: process.env.DB_PASSWORD,
			port: parseInt(process.env.DB_PORT)
		});
	}

	/**
	 * Get the postgreSQL client
	 * @return {string} the actual client
	 */
	public getClient(): Client {
		return this.client;
	}

}

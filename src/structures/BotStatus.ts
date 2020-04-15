export default class BotStatus {

    // Private static variable used to store if the bot is running or not.
    private static is_running: boolean;

    /**
     * Set if the bot is running or not, either on (true) or off (false)
     * @param {boolean} input Either true or false
     */
	public static setRunning(input: boolean): void {
		this.is_running = input;
	}

    /**
     * Check if the bot is running
     * @return {boolean} Either true of false
     */
	public static isRunning(): boolean {
		return this.is_running;
	}

}

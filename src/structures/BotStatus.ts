export default class BotStatus {

    private static is_running: boolean;

	public static setRunning(input: boolean): void {
		this.is_running = input;
	}

	public static isRunning(): boolean {
		return this.is_running;
	}
	
}

export default class Format {
	static minAndSec (time: number) {
		let minute: number, 
			second: number, 
			minuteFormat: string, 
			secondFormat: string;

		minute = Math.floor(time/60) 
		second = Math.round(time - minute*60)
		minuteFormat = minute >= 10 ? minute.toString() : `0${minute}`
		secondFormat = second >= 10 ? second.toString() : `0${second}`
		return `${minuteFormat}:${secondFormat}`
	}
}
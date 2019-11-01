export default class Tools {
	static throttle(fn, wait) {
		let timeout
		let start = new Date().getTime();
		let threshhold = wait || 160
		return function () {
			let context = this, args = arguments, curr = new Date().getTime()
			clearTimeout(timeout)//总是干掉事件回调
			if (curr - start >= threshhold) {
				fn.apply(context, args) //只执行一部分方法，这些方法是在某个时间段内执行一次
				start = curr
				
			} else {
				//让方法在脱离事件后也能执行一次
				// timeout = setTimeout(function () {
				// 	fn.apply(context, args)
				// }, threshhold);
			}
		}
	}
	static debounce(fn, wait = 100) {
		let timer;
		return function () {
			clearTimeout(timer)
			let context = this
			let args = arguments
			timer = setTimeout(() => {
				fn.apply(context, args)
			}, wait);
		}
	}
}
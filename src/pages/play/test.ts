function *hello() {
	console.log('111')
	yield 'hello'
	console.log('222')
	yield 'world'
	console.log('333')
}

const hw = hello()
hw.next()
hw.next()
hw.next()
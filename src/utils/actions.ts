
type IAction<T, U> = (type: T, payload?: U) => {type: T, payload: U}

const createAction:IAction<string, any> = function (type, payload) {
	return {type, payload}
}
export default createAction




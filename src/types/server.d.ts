/**
 * 请求模块
 */
declare namespace Server_Request {
	export interface IRequest {
		url: string,
		data?: object,
		header?: object,
		method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT',
		dataType?: string,
		responseType?: string
		[propName: string]: any
	}
}




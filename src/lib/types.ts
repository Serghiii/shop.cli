export interface ErrorStatus {
	code?: number
	message: string
	error?: string
}

export class ErrorMessage extends Error {
	code: number | undefined
	error: string | undefined
	constructor(message: string, code?: number, error?: string) {
		super(message)
		this.code = code
		this.error = error
	}
}

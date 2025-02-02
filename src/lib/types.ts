export interface ErrorStatus {
	code?: number
	message: string
	messageId?: string
}

export class ErrorMessage extends Error {
	code: number | undefined
	messageId: string | undefined
	constructor(message: string, code?: number, messageId?: string) {
		super(message)
		this.code = code
		this.messageId = messageId
	}
}

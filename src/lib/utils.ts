export const tt = (str: string, lang: string = 'uk', defstr: string = 'undefined') => {
	const value = JSON.parse(str)
	let res: string = value?.[lang] ? value[lang] : ''
	if (res.length == 0) res = value?.['uk'] ? value['uk'] : defstr
	return res
}

export const decodePayload = (payload: string) => {
	return JSON.parse(Buffer.from(payload, 'base64').toString('utf8'))
}

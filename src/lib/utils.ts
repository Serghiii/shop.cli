import clsx, { ClassValue } from 'clsx'

export function cn(...args: ClassValue[]): string {
	return clsx(args)
}

export const tt = (str: string, lang: string = 'uk', defstr: string = 'undefined') => {
	const value = JSON.parse(str)
	let res: string = value?.[lang] ? value[lang] : ''
	if (res.length == 0) res = value?.['uk'] ? value['uk'] : defstr
	return res
}

export const decodePayload = (payload: string) => {
	return JSON.parse(Buffer.from(payload, 'base64').toString('utf8'))
}

export enum Resize {
	Auto = 'auto'
}
// change image size and quality
export const resize: any = (
	base64: string,
	width: Resize | number,
	height: Resize | number,
	quality: number | undefined = undefined,
	type: string = 'image/jpeg'
) => {
	return new Promise((resolve, reject) => {
		const img = new Image()
		img.src = `data:${type};base64,${base64}`
		img.onload = () => {
			const canvas = document.createElement('canvas')
			const newWidth = width == Resize.Auto ? img.width : width
			const newHeight = height == Resize.Auto ? img.height : height
			canvas.width = newWidth
			canvas.height = newHeight
			const ctx = canvas.getContext('2d')
			ctx?.drawImage(img, 0, 0, newWidth, newHeight)
			const newBase64 = canvas
				.toDataURL(type, quality ? quality / 100 : quality)
				.replace(/^data:image\/\w+;base64,/, '')
			resolve(newBase64)
		}
		img.onerror = err => {
			reject(err)
		}
	})
}

'use client'
import React from 'react'
import { getDictionary } from '../app/[lang]/dictionaries'

type Dictionary = Awaited<ReturnType<typeof getDictionary>>

const DictionaryContext = React.createContext<Dictionary | undefined>(undefined)

export default function DictionaryProvider({
	dictionary,
	children
}: {
	dictionary: Dictionary
	children: React.ReactNode
}) {
	return <DictionaryContext value={dictionary}>{children}</DictionaryContext>
}

const getKeys = (str: string, obj: {}): any => {
	for (const [key, value] of Object.entries(obj)) {
		if (str === key) return value
	}
	return undefined
}

export function useDictionary() {
	const d = React.useContext(DictionaryContext)

	const t = (str: string) => {
		const keys: string[] = str.split('.')
		let res: any = d
		for (let i in keys) {
			res = getKeys(keys[i], res)
		}
		return res
	}

	if (!d) {
		throw new Error('useDictionary hook must be used within DictionaryProvider')
	}

	return { d, t }
}

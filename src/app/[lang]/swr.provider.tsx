'use client'
import { SWRConfig } from 'swr'

const swrConfig = {
	revalidateOnFocus: true,
	shouldRetryOnError: true
}

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
	return <SWRConfig value={swrConfig}>{children}</SWRConfig>
}

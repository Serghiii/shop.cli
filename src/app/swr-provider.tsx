'use client';
import { SWRConfig } from 'swr'

const swrConfig = {
    revalidateOnFocus: false,
    shouldRetryOnError: true
}

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  return <SWRConfig value={swrConfig}>{children}</SWRConfig>
}
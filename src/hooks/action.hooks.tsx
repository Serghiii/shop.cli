'use client'
import { useMemo } from 'react'
import { bindActionCreators } from 'redux'
import {
	ErrorUpdate,
	GoogleAuthAction,
	LoginAuthAction,
	LogoutAuthAction,
	RegisterAuthAction,
	useAppDispatch
} from '../redux'

const rootActions = {
	ErrorUpdate,
	GoogleAuthAction,
	LoginAuthAction,
	LogoutAuthAction,
	RegisterAuthAction
}

export const useActions = () => {
	const dispatch = useAppDispatch()
	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}

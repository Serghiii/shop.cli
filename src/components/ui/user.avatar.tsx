'use client'
import Avatar from '@mui/material/Avatar'
import cn from 'clsx'
import { Ref } from 'react'

interface PUserAvatar {
	className?: string
	height: number
	width: number
	path: string
	ref?: Ref<HTMLDivElement>
}

const UserAvatar = ({ className, height, width, path, ref }: PUserAvatar) => {
	return (
		<Avatar
			alt='Аватар'
			className={cn(className)}
			sx={{ width, height }}
			src={
				path?.trim().length > 0
					? path.includes('lh3.googleusercontent.com')
						? path
						: `${process.env.STATIC_URL}/avatars/${path}`
					: '/icon/profile/avatar-none.svg'
			}
			ref={ref}
		/>
	)
}

export default UserAvatar

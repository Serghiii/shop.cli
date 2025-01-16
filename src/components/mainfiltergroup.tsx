'use client'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { useParams } from 'next/navigation'
import { memo, useState } from 'react'
import { CheckBoxItem } from '.'
import { tt } from '../lib/utils'

const MainFilterGroup: React.FC<any> = ({ loading, cond, items, fitems, brandZone, brandZoneClick, handleChange }) => {
	const { lang } = useParams<{ lang: string }>()
	const [open, setOpen] = useState(true)

	const handleClick = () => {
		setOpen(!open)
	}
	return (
		<>
			{items && (
				<ListItemButton onClick={handleClick}>
					<ListItemText primary={tt(items.name, lang)} />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
			)}
			{items && (
				<Collapse in={open} timeout='auto' unmountOnExit>
					<List component='div' disablePadding>
						{items.data.map((item: any) => (
							<CheckBoxItem
								key={item.prop}
								loading={loading}
								data={item}
								fdata={fitems?.find((el: any) => el.prop === item.prop)}
								brandZone={brandZone}
								brandZoneClick={brandZoneClick}
								checked={cond[0].includes(item.prop)}
								handleChange={handleChange}
							/>
						))}
					</List>
				</Collapse>
			)}
		</>
	)
}

export default memo(MainFilterGroup)

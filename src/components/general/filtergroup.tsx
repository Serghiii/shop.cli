'use client'
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { AnimatePresence, motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { memo, useEffect, useState } from 'react'
import { CheckBoxItem } from '.'
import { tt } from '../../lib/utils'

const FilterGroup: React.FC<any> = ({
	loading,
	limit,
	cond,
	items,
	fitems,
	brandZone,
	brandZoneClick,
	handleChange
}) => {
	const { lang } = useParams<{ lang: string }>()
	const [open, setOpen] = useState(true)
	const [expanded, setExpanded] = useState<boolean>(false)
	const limitItems = items?.data.slice(0, limit)
	const defaultItems = expanded ? items?.data : limitItems
	const showExpanded = items?.data.length > limit
	const [visible, setVisible] = useState<boolean>(false)

	useEffect(() => {
		setVisible(true)
	}, [])

	const handleOpenClick = () => {
		setOpen(!open)
	}

	const handleExpandedClick = () => {
		setExpanded(!expanded)
	}

	return (
		<>
			{items && (
				<ListItemButton sx={{ paddingBottom: 0 }} onClick={handleOpenClick}>
					<ListItemText primary={tt(items.name, lang)} />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
			)}
			{items && (
				<Collapse in={open} timeout='auto' unmountOnExit>
					<List component='div' disablePadding>
						<AnimatePresence>
							{defaultItems.map((item: any) => (
								<motion.div
									key={item.prop}
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: 'auto' }}
									exit={{ opacity: 0, height: 0 }}
									transition={{ duration: 0.3 }}
								>
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
								</motion.div>
							))}
						</AnimatePresence>
						<Box
							sx={{
								display: showExpanded && visible ? 'flex' : 'none',
								justifyContent: 'center',
								alignItems: 'center',
								height: 15,
								paddingTop: 0
							}}
						>
							<IconButton
								sx={{
									transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
									transition: 'transform 0.3s ease-in-out'
								}}
								onClick={handleExpandedClick}
							>
								<ArrowDropDownCircleOutlinedIcon />
							</IconButton>
						</Box>
					</List>
				</Collapse>
			)}
		</>
	)
}

export default memo(FilterGroup)

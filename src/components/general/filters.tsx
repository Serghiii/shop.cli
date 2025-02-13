'use client'
import List from '@mui/material/List'
import ListSubheader from '@mui/material/ListSubheader'
import { memo, useCallback, useMemo, useState } from 'react'
import useSWR from 'swr'
import { FilterGroup } from '.'
import { useDictionary } from '../../contexts'
import { fetchService } from '../../services'

const Filters: React.FC<any> = ({ group, cond, page, fdata }) => {
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState([])
	const [brandZoneClick, setBrandZoneClick] = useState(false) // tracks the moment of clicking in the brand zone to prevent flickering updates in the brand zone
	const { d } = useDictionary()
	const brandZone = useMemo(() => {
		// brend zone
		return Boolean(cond[0].find((el: string) => el.includes('brand-')) !== undefined)
	}, [cond])

	const url =
		`/products/filter/${group}` +
		cond[0].reduce(
			(acc: string, curr: string) =>
				brandZone && curr.includes('brand-')
					? (acc = acc + curr + '&')
					: !brandZone && !curr.includes('brand-')
					? (acc = acc + curr + '&')
					: acc,
			'?'
		)
	const fetcher = async (url: string) => {
		setLoading(true)
		await fetchService
			.get(url)
			.then(responce => responce.json())
			.then(data => {
				setLoading(false)
				setBrandZoneClick(false)
				setData(data)
			})
			.catch(() => setLoading(false))
	}
	useSWR(url, fetcher)

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			page[1](1)
			setBrandZoneClick(e.target.name.includes('brand-'))
			if (e.target.checked) cond[1]([...cond[0], e.target.name])
			else cond[1](cond[0].filter((el: any) => el !== e.target.name))
		},
		[cond, page]
	)

	const getGroupedItems = useCallback(() => {
		let fData: [{}] | any = []
		let tmpId: any
		fdata?.forEach((el: any) => {
			if (tmpId !== el.id) {
				let newData = fdata.filter((item: any) => item.id === el.id)
				fData.push({ id: el.id, name: el.name, data: [...newData] })
				tmpId = el.id
			}
		})
		return fData
	}, [fdata])

	return (
		<>
			<List
				sx={{ bgcolor: 'background.paper' }}
				component='nav'
				aria-labelledby='nested-list-subheader'
				subheader={
					<ListSubheader component='div' id='nested-list-subheader'>
						{d.filter.title}
					</ListSubheader>
				}
			>
				{getGroupedItems()?.map((item: any) => (
					<FilterGroup
						key={item.id}
						loading={loading}
						limit={2}
						cond={cond}
						items={item}
						fitems={data}
						brandZone={brandZone}
						brandZoneClick={brandZoneClick}
						handleChange={handleChange}
					/>
				))}
			</List>
		</>
	)
}

export default memo(Filters)

'use client'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useState } from 'react'
import { tt } from '../lib/utils'
import { useParams } from 'next/navigation'

const MainGroupCard: React.FC<any> = ({ item }) => {
	const { lang } = useParams<{ lang: string }>()
	const [raised, setRaised] = useState(false)
	const setCardUp = () => setRaised(true)
	const resetCardUp = () => setRaised(false)

	return (
		<Link href={`/${item.ref}`} passHref>
			<Box width={200} height='100%'>
				<Card raised={raised} onMouseOver={setCardUp} onMouseOut={resetCardUp}>
					<CardActionArea>
						<Box display='flex' justifyContent='center' pt={3}>
							<img
								style={{ maxHeight: '160px', maxWidth: '100%' }}
								src={`${process.env.STATIC_URL}/subgroups/${item.pic}`}
								alt={item.name}
							/>
						</Box>
						<CardContent>
							<Typography variant='h6' align='center' color='textPrimary'>
								{tt(item.name, lang)}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</Box>
		</Link>
	)
}

export default MainGroupCard

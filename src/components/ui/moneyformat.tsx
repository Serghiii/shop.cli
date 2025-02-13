'use client'
const numberFormatUAH = new Intl.NumberFormat('uk-UA', {
	style: 'currency',
	currency: 'UAH',
	useGrouping: true,
	currencyDisplay: 'symbol'
})

function currencyFormatUAH(num: number) {
	return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' грн'
}
const numberFormat = new Intl.NumberFormat('uk-UA', {
	style: 'decimal',
	minimumFractionDigits: 2,
	useGrouping: false
})

const MoneyFormat = ({ value, className, currency = true }: any) => {
	return (
		<span className={className}>
			{currency
				? currencyFormatUAH(value / 100) /*numberFormatUAH.format(value / 100)*/
				: numberFormat.format(value / 100)}
		</span>
	)
}

export default MoneyFormat

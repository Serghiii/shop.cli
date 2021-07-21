const numberFormatUAH = new Intl.NumberFormat("uk-UA", {
   style: "currency",
   currency: "UAH",
   useGrouping: false
});

const numberFormat = new Intl.NumberFormat("uk-UA", {
   style: "decimal",
   minimumFractionDigits: 2,
   useGrouping: false
});

const MoneyFormat = ({ value, className, currency = true }: any) => {
   return (
      <span className={className}>
         {currency ? numberFormatUAH.format(value / 100) : numberFormat.format(value / 100)}
      </span>
   );
}

export default MoneyFormat
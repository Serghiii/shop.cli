export const tt = (value: string, lang: string = 'uk', defstr: string = 'undefined') => {
   // console.log('val', value, JSON.stringify(value))
   let res: string = JSON.parse(JSON.stringify(value))[lang]
   if (res === undefined) {
      res = JSON.parse(value)['uk']
      if (res === undefined) res = defstr
   }
   return res
}
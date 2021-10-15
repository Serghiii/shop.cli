import uk from './uk';
import ru from './ru';

export const translate = (str: string, lang: string = 'uk') => {
   const langs: any[] = [{ uk }, { ru }]
   let res: any = undefined;

   const strs: string[] = str.split('.')
   if (strs.length <= 0) return res

   const getObj = (obj: any[], key: string) => {
      let res: any = undefined;
      for (let el of obj) {
         res = el[key]
         if (res !== undefined) break
      }
      return res
   }

   res = getObj(langs, lang)[strs[0]]
   for (let index = 1; index < strs.length; index++) {
      res = getObj(res, strs[index])
      if (res === undefined) break
   }

   return res
}
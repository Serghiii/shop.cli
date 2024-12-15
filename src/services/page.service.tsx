export const pageService = {

    isProduct(str: string[]):boolean {
        let res: boolean = false
        if (str.length === 2 && str[1].length > 5) {
           res = (str[1].slice(-5) === '.html')
        }
        return res
    },

    extractId(str: string) {
       const dt = str.split('-')
       return dt[dt.length - 1].split('.')[0]
    },
    
    extractPage(strs: string[]) {
       const res = Number(strs?.find((el: string) => el.includes('page_'))?.split('_')[1])
       return res ? res : 1
    },
    
    makeHeadline (id: number, strs: any[]) {
       const max = 3
       let cond: string[] = []
       for (let index = 0; index < (strs.length > max ? max : strs.length); index++) {
          cond.push(strs[index].propdetail.id)
       }
       cond?.sort((a, b) => a > b ? 1 : -1)
       return cond.reduce((acc: string, curr: any) => (acc = acc + curr.split('-')[1] + '-'), '') + id + '.html'
    },
    
    arrToParams (cond: string[], ch: string[1] = '&') {
       let res: string = ''
       let temp: string = ''
       let first = true
       cond?.sort((a, b) => a > b ? 1 : -1)
       cond?.forEach((el: string) => {
          const dt = el.split('-')
          if (temp !== dt[0]) {
             res = res + (first ? '' : ch) + dt[0] + '-' + dt[1]
             first = false
             temp = dt[0]
          } else {
             res = res + '-' + dt[1]
          }
       })
       return res
    },
    
    paramsToArr(params: string[]) {
       let temp: string[] = []
       params?.forEach((el: any) => {
          let dt = el.split('-')
          for (let i = 1; i < dt.length; i++) {
             temp.push(dt[0] + '-' + dt[i])
          }
       });
       return temp
    }
    
}
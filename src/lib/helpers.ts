import {valuta} from '../constants/index'

export const getMoneyFormat = (num: number) => {
    return `${new Intl.NumberFormat().format(num)} ${valuta}`
}
import {valuta} from '../constants/index'

export const getMoneyFormat = (num: number) => {
    return `${new Intl.NumberFormat().format(num)} ${valuta}`
}

export const getYear = (num: number) => {
    return num == 1 ? 'год' :
        num < 5 ? 'года' : 'лет'
}
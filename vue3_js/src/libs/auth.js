import Cookies from 'js-cookie'
import { tokenCookieKey } from '../store/variables'

const tokenKey = 'V3-Admin-Token'

export const getToken = () => {
    return localStorage.getItem(tokenKey)
}

export const setToken = (token) => {
    Cookies.set(tokenCookieKey, token)
    return localStorage.setItem(tokenKey, token)
}

export const removeToken = () => {
    Cookies.remove(tokenCookieKey)
    return localStorage.removeItem(tokenKey)
}
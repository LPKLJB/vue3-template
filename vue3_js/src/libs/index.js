//localStorage通用方法
//储存localStorage
const setStorage = (key, value) => {
        localStorage.setItem(key, value);
    }
    //获取localStorage
const getStorage = (key) => {
        return localStorage.getItem(key) || '';
    }
    //移除localStorage
const removeStorage = (key) => {
        localStorage.removeItem(key)
    }
    //sessionStorage方法
    //储存sessionStorage
const setSession = (key, value) => {
        sessionStorage.setItem(key, value);
    }
    //获取sessionStorage
const getSession = (key) => {
        return sessionStorage.getItem(key) || '';
    }
    //移除sessionStorage
const removeSession = (key) => {
    sessionStorage.removeItem(key)
}
export {
    setStorage,
    getStorage,
    removeStorage,
    setSession,
    getSession,
    removeSession
}
import getData from './config/axios'
export const login = (params) => getData('/login', params, 'post')

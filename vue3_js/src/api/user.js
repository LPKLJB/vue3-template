import request from './config/request'
export const login = (params) => request('/login', params, 'post')
import request from './request'

const authService = {
    login: (data) => request.post('/auth/login', data),
    register: (data) => request.post('/auth/signup', data),
    verifyUser: () => request.get('/auth/verify-user', { withCredentials: true }),
    logout: () => request.get('/auth/logout', { withCredentials: true }),
}

export default authService
import request from './request'

const notificationService = {
    getAll: (data) => request.post('/notification', data),
}

export default notificationService
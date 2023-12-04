import request from './request'

const documentService = {
    getAll: (data) => request.get('/documents/all-docs', data),
}

export default documentService
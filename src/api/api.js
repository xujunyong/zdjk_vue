import request from '../common/js/request'

export const getColumn = params => {
    return request({
        url: '/config/column',
        method: 'get',
    })
};


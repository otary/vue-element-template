import request from '@/utils/request'

export function listAllQuotations(params) {
  return request({
    url: '/quotations/list',
    method: 'get',
    params
  })
}

export function addQuotation(data) {
  return request({
    url: '/quotations/add',
    method: 'put',
    data
  })
}

export function updateQuotation(data) {
  return request({
    url: '/quotations/update',
    method: 'post',
    data
  })
}

export function deleteQuotation(quotationIds) {
  return request({
    url: `/quotations/${quotationIds}/delete`,
    method: 'delete'
  })
}

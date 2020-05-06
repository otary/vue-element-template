import request from '@/utils/request'

export function listAllTopics(params) {
  return request({
    url: '/topics/list',
    method: 'get',
    params
  })
}

export function updateTopic(data) {
  return request({ url: '/topics/update', method: 'post', data })
}

export function addTopic(data) {
  return request({ url: '/topics/add', method: 'put', data })
}

export function deleteTopic(topicIds) {
  return request({ url: `/topics/${topicIds}/delete`, method: 'delete' })
}

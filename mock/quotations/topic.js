import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    topicId: '@id',
    topicName: '@cname',
    createTime: '@datetime',
    orderId: 0
  }]
})

export default [
  {
    url: '/topics/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        total: items.length,
        pages: 5,
        limit: 25,
        offset: 0,
        data: items
      }
    }
  }, {
    url: '/topics/add',
    type: 'put',
    response: config => {
      return {}
    }
  }, {
    url: '/topics/.*/delete',
    type: 'delete',
    response: config => {
      return {}
    }
  }, {
    url: '/topics/update',
    type: 'post',
    response: config => {
      return {}
    }
  }
]

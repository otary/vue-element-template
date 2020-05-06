import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    qid: '@id',
    content: '@sentence(10, 30)',
    createTime: '@datetime',
    likesCount: '@integer(1,100)',
    collectCount: '@integer(1,100)',
    'state|1': ['PUBLISH', 'DRAFT', 'DELETED']
  }]
})

export default [
  {
    url: '/quotations/list',
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
    url: '/quotations/add',
    type: 'put',
    response: config => {
      return {}
    }
  }, {
    url: '/quotations/.*/delete',
    type: 'delete',
    response: config => {
      return {}
    }
  }, {
    url: '/quotations/update',
    type: 'post',
    response: config => {
      return {}
    }
  }
]

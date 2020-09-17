'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 用户列表
  async index() {
    let res = [{
      id: 1,
      username: '1767386755',
      nickname: 'Gene',
      sex: 1
    }, {
      id: 2,
      username: '110',
      nickname: 'Rainbow',
      sex: 0
    }, {
      id: 3,
      username: '120',
      nickname: 'Clycle',
      sex: 0
    }]
    // 获取get 传来的参数
    let page = this.ctx.query.page
    this.ctx.body = {
      msg: 'ok',
      res, page
    };
  }

  // 获取用户数据
  async read() {
    this.ctx.body = this.ctx.params;
    // 修改状态码

  }

  // 创建用户 post请求测试
  async create() {
    let { username, password } = this.ctx.request.body;
    this.ctx.body = {
      msg: 'ok',
      user: {
        username,
        password
      }
    }
  }
}

module.exports = UserController;

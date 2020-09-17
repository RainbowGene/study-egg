'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 用户列表
  async index() {
    let res = []

    // findAll()不写参数查询所有
    // res = await this.app.model.User.findAll()

    // 查询多个并计数
    // res = await this.app.model.User.findAndCountAll()

    // 分页  http://127.0.0.1:7001/user/list?page=2
    let page = this.ctx.query.page ? parseInt(this.ctx.query.page) : 1 // 当前页
    let limit = this.ctx.query.limit ? parseInt(this.ctx.query.limit) : 5  // 每页显示条数
    let offset = (page - 1) * limit // 从哪条开始

    // where
    let Op = this.app.Sequelize.Op;
    res = await this.app.model.User.findAndCountAll({
      where: {
        sex: '男',
        // username: {
        //   [Op.like]: "%测试%" //模糊查询
        // },
        // id: {
        //   [Op.gt]: 4 // 大于4
        // },
      },
      // attributes:['id','username','sex'], // 只查这几项
      attributes: {
        exclude: ['password'] // 不查这项
      },
      order: [
        ['id', 'DESC'], // 降序  ASC 升序
        ['updated_at', 'DESC'] // 会以id为先，除非把这个数组写在id排序前面
      ],
      offset,
      limit, // 只显示5条
    })

    this.ctx.body = {
      msg: 'ok',
      data: res
    }
  }

  // 获取单个用户数据
  async read() {
    let id = parseInt(this.ctx.params.id);
    // 通过主键查询
    // let res = await this.app.model.User.findByPk(id)

    // 条件查询
    let res = await this.app.model.User.findOne({
      where: {
        id,
        sex: '女'
      }
    })
    if (!res) {
      return this.ctx.body = {
        status: '201',
        data: '用户不存在'
      }
    }
    this.ctx.body = {
      status: '200',
      data: res
    }
  }

  // 创建用户 post请求测试
  async create() {
    // 测试抛出异常
    // this.ctx.throw(500, '测试错误');

    let params = this.ctx.request.body;

    // 参数验证: 安装插件 npm i egg-valparams --save
    this.ctx.validate({
      username: { type: 'string', required: true, desc: '用户名' },
      password: { type: 'string', required: true, desc: '密码' },
      sex: { type: 'string', required: false, defValue: '保密', desc: '性别' },
    })

    // 新增单个
    let res = await this.app.model.User.create(params)

    // 批量新增
    // let res = await this.app.model.User.bulkCreate([
    //   { username: 'Linire', password, sex: '女' },
    //   { username: '德莱文', password, sex: '男' },
    //   { username: '德莱厄斯', password, sex: '男' },
    //   { username: 'Rewen', password, sex: '女' },
    //   { username: 'Ejiate', password, sex: '男' },
    //   { username: '起飞', password, sex: '男' }
    // ])
    this.ctx.body = {
      msg: 'ok',
      res
    }
  }

  // 修改 http://127.0.0.1:7001/user/update/4
  async update() {
    let id = this.ctx.params.id ? parseInt(this.ctx.params.id) : 0
    let params = this.ctx.request.body // 前台传来需要更改的数据
    // 拿到记录
    let data = await this.app.model.User.findByPk(id)
    if (!data) return this.ctx.body = { data: '不存在的记录', status: 201 }

    // 存在记录开始修改: update 第一个参数：新对象 ， 第二个参数：只允许修改的对象
    let res = await data.update(params, { fields: ['username', 'sex'] })

    if (!res) return this.ctx.body = { data: '修改失败', status: 201 }
    this.ctx.body = {
      status: 200,
      data: `${id}被修改了${JSON.stringify(params)}`
    }
  }

  // 删除和批量删除
  async destroy() {
    // let id = this.ctx.params.id ? parseInt(this.ctx.params.id) : 0
    // let data = await this.app.model.User.findByPk(id);
    // if (!data) return this.ctx.body = { status: 201, msg: '不存在的记录' }

    // // 执行删除 单个
    let res = await data.destroy();

    // 删除多个 : 使用where
    // let Op = this.Sequelize.Op
    // let res = await this.app.model.User.destroy({
    //   where: {
    //     id: {
    //       [Op.lte]: 7 // id小于7的
    //     }   
    //   }
    // })

    if (!res) return this.ctx.body = { status: 201, msg: '删除失败！' }


    this.ctx.body = {
      status: 200,
      msg: `${id}删除成功`
    }
  }
}

module.exports = UserController;

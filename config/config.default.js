/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1600257149960_4176';

  // 在这里添加中间件
  config.middleware = ['errorHandler'];

  // 中间件的配置
  config.errorHandler = {
    enable: true, // 是否开启
    // match: '/user/list', // 中间件的启用条件,可以写成数组
    // ignore: '/user/list' // 非启用条件 相当于 !match
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 关闭 csrf，开启跨域
  config.security = {
    csrf: {
      enable: false,
    },
    // 跨域白名单
    domainWhiteList: []
  };

  // 允许跨域的方法
  config.cors = {
    origin: '*',
    allowMethods: 'GET,PUT,POST,DELETE,PATCH'
  };

  // mysql 配置
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: 'H9MvYSqY3JmAC4aj',
    port: 3306,
    database: 'eggapi',
    // 中国时区
    timezone: '+08:00',
    define: {
      // 取消数据表名复数
      freezeTableName: true,
      // 自动写入时间戳 created_at updated_at
      timestamps: true,
      // 字段生成软删除时间戳 deleted_at
      // paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      // deletedAt: 'deleted_at',
      // 所有驼峰命名格式化
      underscored: true
    }
  };

  // 配置 验证参数插件
  config.valparams = {
    locale: 'zh-cn', // 中文
    throwError: true  // 主动抛出异常
  };

  return {
    ...config,
    ...userConfig,
  };
};

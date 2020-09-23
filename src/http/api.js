import request from './index'
/* eslint-disable*/
// 登录
const login = (data) => {
  return request.post('user/login', data);
};
// 首页 折线图数据导出
const homePagetData = (data) => {
  return request.get('user/getDayBeforeSeven', data);
};
// 温湿度 折线图数据
const getEchartData = (data) => {
  return request.post('user/getDeviceByHours', data);
};
// 数据监控
const monitoring = (data) => {
  return request.get('user/getGatewayData', data);
};
// 测试
const test = (data) => {
  return request.post('http://192.168.1.107:8701/user/getDeviceByHours', data);
};
//导出数据预览 测试
const DatapreviewTest = (data) => {
  return request.post('http://192.168.1.107:8701/user/getExportData', data);
};
// 导出数据预览
const Datapreview = (data) => {
  return request.post('user/getExportData', data);
};
export default {
  login,
  homePagetData,
  getEchartData,
  monitoring,
  Datapreview,
  test,
  DatapreviewTest
};

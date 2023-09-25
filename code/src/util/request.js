// 引入axios
import axios from 'axios';
//后端项目的服务器地址
// let baseUrl="https://api.chatanywhere.com.cn/";
let baseUrl="http://101.200.181.118:80/";
// 创建axios实例
const httpService = axios.create({
// url前缀-'http:xxx.xxx'
// baseURL: process.env.BASE_API, // 需自定义
baseURL:baseUrl,
// 请求头信息
headers: {
    'Content-Type': 'application/json;charset=UTF-8',   
    'Authorization': `Bearer sk-mNVP9EBcBwIYJ8VtsaY7aALnXvmnGNKDMWFBymzgafjiwT2U`,

  },

// 请求超时时间
timeout: 15000 // 需自定义
});
//添加请求和响应拦截器
// 添加请求拦截器
httpService.interceptors.request.use(function (config) {
// 在发送请求之前做些什么
//在你的请求头上设置token值
// config.headers.token=store.getters.GET_TOKEN
return config;
}, function (error) {
// 对请求错误做些什么
return Promise.reject(error);
});
// 添加响应拦截器
httpService.interceptors.response.use(function (response) {
// 对响应数据做点什么
return response;
}, function (error) {
// 对响应错误做点什么
return Promise.reject(error);
});
/*网络请求部分*/
/*
* get请求
* url:请求地址
* params:参数
* */
export function get(url, params = {}) {
return new Promise((resolve, reject) => {
httpService({
url: url,
method: 'get',
params: params
}).then(response => {
resolve(response);
}).catch(error => {
reject(error);
});
});
}
/*
* post请求
* url:请求地址
* params:参数
###
* */
export function post(url, params = {}) {
return new Promise((resolve, reject) => {
httpService({
url: url,
method: 'post',
data: params
}).then(response => {
console.log(response)
resolve(response);
}).catch(error => {
console.log(error)
reject(error);
});
});
}
/*
* 文件上传
* url:请求地址
* params:参数
* */
export function fileUpload(url, params = {}) {
return new Promise((resolve, reject) => {
httpService({
url: url,
method: 'post',
data: params,
headers: { 'Content-Type': 'multipart/form-data' }
}).then(response => {
resolve(response);
}).catch(error => {
reject(error);
});
});
}
export function getServerUrl(){
return baseUrl;
}
export default {
get,
post,
fileUpload,
getServerUrl
}
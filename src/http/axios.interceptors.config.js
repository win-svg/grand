// import {Message} from "ant-design-vue";
export const setInerceptors = (axiosInstance) => {
  axiosInstance.interceptors.response.use(response => {
    // if(response.data.code === 2003 || response.data.code === 2001) {
    //       Message.warning('登录过期，请重新登录');
    //       setInterval(function () {
    //     sessionStorage.clear()
    //     window.location.reload()
    //   },500)
    // } else {
         return response
    // }
  });
  // axiosInstance.interceptors.request.use((req) => {
  //   return req;
  // },function (error) {
  //   console.log(error);
  // });
};



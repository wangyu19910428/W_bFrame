/*
 对于fetch请求的封装
 参数：
 url：请求的地址；
 params：传给后台的参数ps:{username:tongshuo,password:123456}；
 type：请求的类型；http://develop.noahapi.test.dabanma.com;
 formData： 用于提交文件发起请求，留空不传参数则会按照正常的post方式请求；
 */

import 'whatwg-fetch';
// import SSOLogin from './SSOLogin';

export default function sendFetch (url, parmas, type, formData,test) {
    let reg=/^localhost/;
    let reg1=/^sunny.test.uxincredit.com/;
    let reg2=/^127.0.0.1/;
    let newUrl
    if (parseInt(window.location.port) === 9000) {
      newUrl = `http://localhost:9001/${url}`
    } else if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
      newUrl = url
    } else if(reg.test(window.location.host)||reg1.test(window.location.host)||reg2.test(window.location.host)){
      newUrl=`http://foundation.ceshi.youxinjinrong.com/api/sunny/${url}`;
    }else{
      newUrl=`http://foundation.youxinjinrong.com/api/sunny/${url}`;
    }
    if(type=='post') {
        if(!formData) {
            var options = {
                method:'POST',
                credentials:'include',
                body:JSON.stringify(parmas),
            };
        } else if((test == true) && formData) {
            newUrl = url;
            var options = {
                method:'POST',
                // 每次fetch请求都携带cookie
                /*credentials:'include',*/
                body:parmas
            };
        } else {
            var options = {
                method:'POST',
                // 每次fetch请求都携带cookie
                credentials:'include',
                body:parmas
            };
        };
        return new Promise (function(resolve, reject) {
            fetch(newUrl, options)
                .then((response) => {
                    if(response.ok) {
                        return response.json()
                    } else {
                        console.log(response);
                        if(response.status == 404) {
                            console.log(response);
                        }
                        if(response.status >= 500){
                            alert('服务器繁忙,请重试；\r\nCode:'+ response.status)
                        }
                    }
                })
                .then((data) => {
                    if(data) {
                        // 成功！
                        // SSOLogin.filterData(data);
                        resolve(data);
                    } else {
                        // 失败
                        reject(data.msg);
                    }
                })
                .catch(function (err) {
                    resolve({code:1111,msg:'服务异常请稍后再试'});
                })
        })
    } else {
        // GET请求；
        if(test == true){
            newUrl = url;
        }
        if(parmas) {
            let parmasArray = [];
            Object.keys(parmas).forEach(key => parmasArray.push(key + '=' + encodeURIComponent(parmas[key])))
            if(newUrl.search(/\?/)===-1) {
                newUrl += '?' + parmasArray.join('&')
            } else {
                newUrl += '&' + parmasArray.join('&')
            }
        }
        return new Promise (function(resolve, reject) {
            fetch(newUrl,{credentials:'include'})
                .then((response) => {
                    if(response.ok) {
                        return response.json()
                    } else {
                        if(response.status == 404) {
                            console.log(response);
                        }
                        if(response.status >= 500){
                            alert('服务器繁忙,请重试；\r\nCode:'+ response.status)
                        }
                    }
                })
                .then((data) => {
                    if(data) {
                        // 成功！
                        // SSOLogin.filterData(data);
                        resolve(data)
                    } else {
                        // 失败
                        reject(data.msg)
                    }
                })
                .catch(function (err) {
                    resolve({code:1111,msg:'服务异常请稍后再试'});
                })
        })
    }
}
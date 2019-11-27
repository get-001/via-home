import Axios from "axios";
import Vue from 'vue';

const imgPrestrain = (function () {
    const imgDom = new Image();
    return (imgUrl) => {
        return new Promise((resolve) => {
            imgDom.onload = () => {
                resolve(imgUrl);
            }
            imgDom.src = imgUrl;
        });
    }
}());

// [函数] 生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
            return 0;
    }
}

// 获取缓存数据
function getData(key) {
    let data = localStorage[key];
    try {
        data = JSON.parse(data);
    } catch (error) {
        data = {}
    }
    data = typeof data !== 'object' ? {} : data;
    return data;
}
// 设置缓存数据
function setData(key, data) {
    data = JSON.stringify(data);
    localStorage[key] = data;
}
// 事件绑定，兼容性的写法、
// 参数：元素对象,事件类型(文本),执行的函数、
function addEvent(elem, type, handle) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handle, false);
    } else if (elem.attachEvent) {
        elem.attachEvent("on" + type, function () {
            handle.call(elem);
        });
    } else {
        elem["on" + type] = handle;
    }
}
/*
* 获取元素被拖拽的进度 ( 0 ~ 1.0 )，
* 参数1为传入的事件对象。
* 参数2是回调返回：参数1为当前拖拽的进度，参数2是布尔值(false/true)是否为最终的结果。
*/
function eDragPercentage(event, callBack) {
    let currentTarget = event.currentTarget,
        width = currentTarget.offsetWidth,
        left = currentTarget.getBoundingClientRect().left,
        offsetX = event.offsetX < 0 ? 0 : event.offsetX > width ? width : event.offsetX, progress = offsetX / width;
    document.onmousemove = e => {
        offsetX = e.pageX - left;
        offsetX = offsetX < 0 ? 0 : offsetX > width ? width : offsetX;
        progress = offsetX / width;
        callBack(progress, false);
    };
    document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        callBack(progress, true);
    };
}

// 函数中的参数分别为 cookie 的名称、值以及过期天数
function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}
// setCookie('userName', 'xxx', 1); // cookie过期时间为1天。

// 函数中的参数为 要获取的cookie键的名称。
function getCookie(userName) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(userName + "=");
        if (c_start != -1) {
            c_start = c_start + userName.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

/**
* js日期格式化，timestamp支持10位或13位的时间戳，或是时间字符串
* @param{string} format传进来的字符串，Y-m-d H:i:s每个字母所代表的意思详见代码
* @param{int string}timestamp 要格式化的时间 默认为当前时间可以是日期形式的字符串，可以是10位或13位的时间戳
* @return {string} 格式化的时间字符串
*/
function dateFormat(format, timestamp) {
    if (timestamp == "" || timestamp == null || format == "") return "";

    //如果传进来的是 日期的字符串形式，变回时间戳
    if (typeof timestamp == "string") {
        //兼容ios
        var timestamp = timestamp.replace("T", " ");
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            timestamp = timestamp.replace(/\-/g, "/");
        }
        if (
            timestamp.indexOf("-") !== false ||
            timestamp.indexOf("/") !== false
        )
            timestamp = new Date(timestamp).getTime();
    }
    //如果传进来的是10位的时间戳 变成13位的
    if (timestamp.toString().length == 10) timestamp = timestamp * 1000;
    //如果到这一步，依然不是13位的时间戳，说明数据有问题
    timestamp = parseInt(timestamp);
    if (timestamp.toString().length != 13) return "";

    var a,
        jsdate = new Date(timestamp);
    var pad = function (n, c) {
        if ((n = n + "").length < c) {
            return new Array(++c - n.length).join("0") + n;
        } else {
            return n;
        }
    };
    var txt_weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    var txt_ordin = {
        1: "st",
        2: "nd",
        3: "rd",
        21: "st",
        22: "nd",
        23: "rd",
        31: "st"
    };
    var txt_months = [
        "",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    var f = {
        // Day
        d: function () {
            return pad(f.j(), 2);
        }, //2位天,02
        D: function () {
            return f.l().substr(0, 3);
        }, //星期单词的前三位
        j: function () {
            return jsdate.getDate();
        }, //天2
        l: function () {
            return txt_weekdays[f.w()];
        }, //星期英文
        N: function () {
            return f.w() + 1;
        }, //星期的某一天的数字 星期日为1
        S: function () {
            return txt_ordin[f.j()] ? txt_ordin[f.j()] : "th";
        },
        w: function () {
            return jsdate.getDay();
        }, //星期的某一天的数字 星期日为0
        z: function () {
            return (
                ((jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5) >> 0
            );
        }, //当前时间是一年中的第几天
        // Month
        F: function () {
            return txt_months[f.n()];
        }, //月份英文
        m: function () {
            return pad(f.n(), 2);
        }, //2位月02
        M: function () {
            return f.F().substr(0, 3);
        }, //月份英文前三个字母
        n: function () {
            return jsdate.getMonth() + 1;
        }, //月2
        t: function () {
            //当前月总共有多少天
            var n;
            if ((n = jsdate.getMonth() + 1) == 2) {
                return 28 + f.L();
            } else {
                if ((n & 1 && n < 8) || (!(n & 1) && n > 7)) {
                    return 31;
                } else {
                    return 30;
                }
            }
        },
        // Year
        L: function () {
            var y = f.Y();
            return !(y & 3) && (y % 1e2 || !(y % 4e2)) ? 1 : 0;
        },
        //年
        Y: function () {
            return jsdate.getFullYear();
        },
        y: function () {
            return (jsdate.getFullYear() + "").slice(2);
        },
        // Time
        a: function () {
            return getHours(jsdate) > 11 ? "pm" : "am";
        },
        A: function () {
            return f.a().toUpperCase();
        },
        B: function () {
            // peter paul koch:
            var off = (jsdate.getTimezoneOffset() + 60) * 60;
            var theSeconds =
                getHours(jsdate) * 3600 +
                jsdate.getMinutes() * 60 +
                jsdate.getSeconds() +
                off;
            var beat = Math.floor(theSeconds / 86.4);
            if (beat > 1000) beat -= 1000;
            if (beat < 0) beat += 1000;
            if (String(beat).length == 1) beat = "00" + beat;
            if (String(beat).length == 2) beat = "0" + beat;
            return beat;
        },
        g: function () {
            return getHours(jsdate) % 12 || 12;
        },
        G: function () {
            return getHours(jsdate);
        },
        h: function () {
            return pad(f.g(), 2);
        },
        H: function () {
            return pad(getHours(jsdate), 2);
        },
        i: function () {
            return pad(jsdate.getMinutes(), 2);
        },
        s: function () {
            return pad(jsdate.getSeconds(), 2);
        },
        //u not supported yet
        // Timezone
        //e not supported yet
        //I not supported yet
        O: function () {
            var t = pad(Math.abs((jsdate.getTimezoneOffset() / 60) * 100), 4);
            if (jsdate.getTimezoneOffset() > 0) t = "-" + t;
            else t = "+" + t;
            return t;
        },
        P: function () {
            var O = f.O();
            return O.substr(0, 3) + ":" + O.substr(3, 2);
        },
        //T not supported yet
        //Z not supported yet
        // Full Date/Time
        c: function () {
            return (
                f.Y() +
                "-" +
                f.m() +
                "-" +
                f.d() +
                "T" +
                f.h() +
                ":" +
                f.i() +
                ":" +
                f.s() +
                f.P()
            );
        },
        //r not supported yet
        U: function () {
            return Math.round(jsdate.getTime() / 1000);
        }
    };
    //兼容ios
    function getHours(dateObj) {
        //因为上边已经将UTC的时间进行了转换，把T去了，所以这里用同样的方法即可
        return dateObj.getHours();

        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            return dateObj.getUTCHours();
        } else {
            return dateObj.getHours();
        }
    }

    var ret = "";
    return format.replace(/[\\]?([a-zA-Z])/g, function (t, s) {
        if (t != s) {
            // escaped
            ret = s;
        } else if (f[s]) {
            // a date function exists
            ret = f[s]();
        } else {
            // nothing special
            ret = s;
        }
        return ret;
    });
}

// 多行文本截取(打点展示)
function intercepting(val, len = 180) {
    if (val.length > len) {
        val = val.slice(0, len) + "...";
    }
    return val;
}

Req.prototype = {
    // http://a-1.vip/Music-Player/api.php
    url: '',
    // get
    get(url, params) {
        return Axios.get(url, { params })
            .then(({ data }) => data, err => {
                // 请求失败 (网络问题导致)
                Vue.prototype.$message({
                    showClose: true,
                    type: 'error',
                    message: err
                });
                return err;
            });
    },
    // post
    post(url, params) {
        return Axios.post(url, params)
            .then(({ data }) => data, err => {
                // 请求失败 (网络问题导致)  '网络请求失败，当前连接异常！'
                Vue.prototype.$message({
                    showClose: true,
                    type: 'error',
                    message: err
                });
                return err;
            });
    },
    // 搜索
    getEntrySuggest(keywords) {
        return this.get("http://api.a-1.vip", {
            url: "http://suggestion.baidu.com/su",
            data: "?wd=" + keywords + "&p=3&ie=utf-8"
        }).then(data => {
            const reg = /[\s\S]*?s:(\[[\s\S]*?\])\}\);/;
            data = data.replace(reg, '$1') || '[]';
            return JSON.parse(data);
        });
    },
    getBg(type) {
        return this.get("http://api.a-1.vip/text/index.php", { type });
    },
    // Axios 下载文件（自定义文件名）
    download(url, filename) {
        return Axios.get(url, { responseType: "blob" }).then(
            res => {
                const blob = new Blob([res.data]);
                const dom = document.createElement("a");
                const href = window.URL.createObjectURL(blob); //创建下载的链接
                dom.href = href;
                dom.download = filename; //下载后文件名
                document.body.appendChild(dom);
                dom.click(); //点击下载
                document.body.removeChild(dom); //下载完成移除元素
                window.URL.revokeObjectURL(href); //释放blob对象
                return filename;
            }, err => {
                return err;
            }
        );
    },
    // getCourier(num) {
    //     return this.get("http://api.a-1.vip", {
    //         url: "https://www.kuaidi100.com/autonumber/autoComNum",
    //         data: "?resultv2=1&text=" + num
    //     });
    // },
    // getCourierResult(type, num) {
    //     return this.get("http://api.a-1.vip", {
    //         url: "https://www.kuaidi100.com/query",
    //         data: "?type=yuantong&postid=" + num + "&temp=" + Math.random() + "&phone="
    //     });
    // }
    statistics(key) {
        return this.get("http://api.a-1.vip/statistics/index.php", { name: key });
    }
}

function Req(url) {
    this.url = url;
}

const api = new Req('http://a-1.vip');

export {
    Req,
    api,
    setCookie,
    getCookie,
    dateFormat,
    intercepting,
    imgPrestrain,
    addEvent,
    eDragPercentage, randomNum,
    getData
};
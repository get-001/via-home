import { api, imgPrestrain } from "@/plug-in/api.js";

function mixture(state, data) {
    for (let key in data) {
        if (state[key] !== undefined && typeof state[key] === typeof data[key]) {
            if (state[key] !== null && typeof state[key] === 'object') {
                mixture(state[key], data[key]);
            } else {
                state[key] = data[key];
            }
        }
    }
}



export default {
    namespaced: true, // 添加上命名空间，定义为模块
    state: {
        home: {
            title: 'via-home',
            placeholder: 'Hello World~',
            dividerText: 'not simple',
            defaultSeo: 'sm',
            efficientSearch: true,
            navType: 'tradition',
        },
        bg: {
            show: true,
            opacity: 50,
            random: true,
            type: "imgMzt",
            url: "",
        },
        bookmark: {
            forbidIcon: false,
        }
    },
    getters: {
        // xxx() { return xxx; }
    },
    mutations: {
        // 该对象存放的是同步的操作
        alter(state, data) {
            mixture(state, data);
            window.localStorage['config'] = JSON.stringify(state);
        },
        upBgImage(state, url) {
            this._mutations['config/alter'][0]({ bg: { url } });
        }
    },
    actions: {
        // 执行异步的，可以重名
        upBgImage({ commit }, type) {
            api.getBg(type).then(data => {
                imgPrestrain(data.content).then(url => {
                    setTimeout(() => {
                        commit('upBgImage', url);
                    }, 2000);
                });
            });
        }
    }
}
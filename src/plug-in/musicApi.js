import Axios from "axios";
import qs from "qs";
import Vue from 'vue';

export default {
    url: 'http://a-1.vip/Music-Player/api.php',
    get(url, params) {
        return Axios.get(url, { params })
            .then(({ data }) => data, err => {
                // 请求失败 (网络问题导致)
                Vue.prototype.$toast.error('网络请求失败，当前连接异常！');
                return err;
            });
    },
    post(url, params) {
        return Axios.post(url, params)
            .then(({ data }) => data, err => {
                // 请求失败 (网络问题导致)  '网络请求失败，当前连接异常！'
                Vue.prototype.$toast.error('网络请求失败，当前连接异常！');
                return err;
            });
    },
    // 搜索
    searchSonglist(entry, pages = 1, count = 10) {
        const params = qs.stringify({
            types: 'search',
            source: 'netease',
            pages, count,
            name: entry
        });
        return this.post(this.url, params);
    },
    // 获取歌曲url
    getSongUrl(id) {
        const params = qs.stringify({
            types: 'url',
            source: 'netease', id
        });
        return this.post(this.url, params).then((data) => { return { url: data.url } });
    },
    // 获取歌曲歌词
    getSongLrc(id) {
        const params = qs.stringify({
            types: 'lyric',
            source: 'netease', id
        });
        return this.post(this.url, params).then((data) => { return { lyric: data.lyric } });
    },
    // 获取歌曲封面
    getSongPic(id) {
        const params = qs.stringify({
            types: 'pic',
            source: 'netease', id
        });
        return this.post(this.url, params).then((data) => {
            const reg = /^([\S]+)\?param=[\d]+y[\d]+$/;
            return { pic: data.url.match(reg)[1] }
        });
    },
    // 获取获取歌曲 all
    getSong(song, formatting) {
        const { id, pic_id, lyric_id } = song;
        return Promise.all([
            this.getSongUrl(id),
            this.getSongPic(pic_id),
            this.getSongLrc(lyric_id)
        ]).then(arr => {
            const data = { ...arr[0], ...arr[1], ...arr[2] };
            if (formatting) {
                data.artistName = song.artist.join("、");
                data.fileName = data.artistName + " - " + song.name;
                data.lyric_obj = this.lyricProcess(data.lyric, data.filename);
            }
            return { ...song, ...data };
        });
    },
    // 歌词处理
    lyricProcess(lyricText, songsName) {
        const lyricArr = [];
        lyricArr.push({ time: 0, content: songsName });
        const reg = /(\[[\d]{2,3}:[\d]{2,3}\.[\d]{2,3}\])(.+)/g;
        lyricText.replace(reg, ($, time, content) => {
            const reg = /\[([\d]{2,3}):([\d]{2,3})\.([\d]{2,3})\]/;
            time.replace(reg, ($, $1, $2, $3) => {
                time = Number($1 * 60 * 1000) + Number($2 * 1000) + Number($3);
            });
            lyricArr.push({ time, content });
        });
        return lyricArr;
    }
}
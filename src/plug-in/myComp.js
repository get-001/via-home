import Vue from 'vue';
import musicCard from '@/components/high-reuse/music/E-card.vue';
let musicCardConstructor = Vue.extend(musicCard);
let instance = null, seed = 1, index = 100;
const install = () => {
    Object.defineProperty(Vue.prototype, '$musicCard', {
        get() {
            let id = 'musicCard_' + seed++
            const musicCard = options => {
                instance = new musicCardConstructor({ propsData: options })
                index++
                instance.id = id
                instance.vm = instance.$mount()
                document.body.appendChild(instance.vm.$el)
                instance.vm.$el.style.zIndex = index;
                return instance.vm;
            }
            return musicCard
        }
    })
}
export default install;